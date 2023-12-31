import { Inject, Injectable } from "@nestjs/common";
import { PromptResponse } from "@core-types/prompt.dto";
import { ChatSummarizerUseCase } from "../chat-templates/chat-sumarizer.use-case";
import { BaseAgentService } from "@services/gpt/agents/base-agent.service";
import { HERO_AGENT_SERVICE, VILLAIN_AGENT_SERVICE } from "@constants/agent.constants";
import { UseCase } from "@interfaces/use-case.interface";

@Injectable()
export class AgentChatUseCase implements UseCase {
  private readonly thresholdCountMessageToSummarize = 4;

  constructor(
    @Inject(HERO_AGENT_SERVICE) private readonly heroAgentService: BaseAgentService,
    @Inject(VILLAIN_AGENT_SERVICE) private readonly villainAgentService: BaseAgentService,
    private readonly chatSummarizerUseCase: ChatSummarizerUseCase,
  ) {}

  async execute(options: { iterations: number; newChat?: boolean; firstMessage?: string }) {
    let { iterations, newChat, firstMessage } = options;
    const chatMessages = [];

    let heroMessages, villainMessages;
    let content = firstMessage;

    for (let i = 0; i < iterations; i++) {
      if (!newChat) {
        const lastMessage = this.villainAgentService.getLastMessage();
        content = lastMessage.content as string;
      }

      heroMessages = (await this.heroAgentService.prompt({ prompt: content, stream: false })) as PromptResponse;
      villainMessages = (await this.villainAgentService.prompt({ prompt: heroMessages.content, stream: false })) as PromptResponse;
      newChat = false;

      chatMessages.push({ role: "Yurayuli", content: heroMessages.content });
      chatMessages.push({ role: "Malphas", content: villainMessages.content });
    }

    const output = {
      conversation: this.chatSummarizerUseCase.joinMessages(chatMessages),
      heroMessages: this.heroAgentService.getMessages(),
      villainMessages: this.villainAgentService.getMessages(),
      heroTokenUsage: heroMessages.usage,
      villainTokenUsage: villainMessages.usage,
    };

    if (!this.shouldSummarizeChats()) return output;

    return await this.summarizeChats(output);
  }

  private async summarizeChats(output) {
    const toSummarizeMessage = ({ role, content }) => ({ role, content: content as string });

    const heroSummarizedMessages = await this.chatSummarizerUseCase.execute(
      this.heroAgentService.getMessages().map(toSummarizeMessage),
    );
    const villainSummarizerMessages = await this.chatSummarizerUseCase.execute(
      this.villainAgentService.getMessages().map(toSummarizeMessage),
    );

    output = {
      ...output,
      heroSummarizedMessages,
      villainSummarizerMessages,
    } as any;

    this.heroAgentService.getMessages().push(this.villainAgentService.getLastMessage());

    this.heroAgentService.pushSystemMessage({ role: "system", content: heroSummarizedMessages });
    this.heroAgentService.resetMessages();

    this.villainAgentService.pushSystemMessage({ role: "system", content: villainSummarizerMessages });
    this.villainAgentService.resetMessages();

    return output;
  }

  private shouldSummarizeChats() {
    return this.heroAgentService.countNonSystemMessages() >= this.thresholdCountMessageToSummarize;
  }
}
