import { PromptResponse } from "src/core/types/prompt.dto";
import { Inject, Injectable } from "@nestjs/common";
import { UseCase } from "@interfaces/use-case.interface";
import { BasePromptGPTService } from "@interfaces/base-prompt-gpt.service.interface";
import { CHAT_PROMPT_SERVICE } from "@constants/gpt-service.constants";

@Injectable()
export class ChatSummarizerUseCase implements UseCase {
    constructor(@Inject(CHAT_PROMPT_SERVICE) private readonly promptGPTService: BasePromptGPTService) {
        this.setupTemplate();
    }
    

    private setupTemplate(): void {
        this.promptGPTService.pushSystemMessage({
            role: "system",
            content: `You are a chat summarizer. 
                Your job summarize all conversation between the Assistant and User, and gives both of them a short, concise text about the conversation.
                Mantain the summary in the original language of the conversation.
                All the messages will follow this format: {role}: {content}. An example of conversation is: 
                user: When Brazil was discovered?
                assistant: Brazil was discovered in 1500.
                user: When Brazil proclaimed its independence?
                assistant: Brazil proclaimed its independence in 1822.
                user: When Brazil became a republic?
                assistant: Brazil became a republic in 1889.
                user: When Brazil became a democracy?
                assistant: Brazil became a democracy in 1985.
                user: When Brazil became a country?
                assistant: Brazil became a country in 1822.                
            `
        })
    }

    public async execute(messages: { role: string, content: string }[] = []) {
        const conversation = this.joinMessages(messages)
        const summarized = await this.promptGPTService.prompt({ prompt: conversation, stream: false }) as PromptResponse;

        return summarized.content
    }

    public joinMessages(messages: { role: string, content: string }[] = []) {
        return messages.reduce(
            (acc, curr) => `${acc}\n${curr.role}: ${curr.content}`,
            ""
        ).substring(1);
    }
}