import { PromptDto } from 'src/core/types/prompt.dto';
import { Controller, Post, Body, Res } from '@nestjs/common';
import { ChatGeneratePromptUseCase } from '@use-case/chat-templates/chat-generate-prompt.use-case';
import { ChatSummarizerUseCase } from '../../use-cases/chat-templates/chat-sumarizer.use-case';
import { ChatNestJSProgrammerUseCase } from '@use-case/chat-templates/chat-nestjs-programmer.use-case';
import { ChatShellUseCase } from '@use-case/chat-templates/chat-shell.use-case';
import { ChatMidjourneyUseCase } from '@use-case/chat-templates/chat-midjourney.use-case';
import { ChatFreelanceProposalUseCase } from '@use-case/chat-templates/chat-freelance-proposal.use-case';
import { ChatBussinessUseCase } from '@use-case/chat-templates/chat-bussiness.use-case';

@Controller("chat")
export class ChatController {
  constructor(
    private readonly chatFreelanceProposalUseCase: ChatFreelanceProposalUseCase,
    private readonly chatNestJSProgrammerUseCase: ChatNestJSProgrammerUseCase,
    private readonly chatShellUseCase: ChatShellUseCase,
    private readonly chatGeneratePromptUseCase: ChatGeneratePromptUseCase,
    private readonly chatMidjourneyUseCase: ChatMidjourneyUseCase,
    private readonly chatSummarizerUseCase: ChatSummarizerUseCase,
    private readonly chatBussinessUseCase: ChatBussinessUseCase,
  ) { }

  @Post("/freelance-proposal")
  freelancerProposall(@Body() body: PromptDto) {
    return this.chatFreelanceProposalUseCase.execute(body);
  }

  @Post("/programmer")
  async programmer(
    @Body() body: PromptDto,
  ) {
    return this.chatNestJSProgrammerUseCase.execute(body);
  }


  @Post("/shell")
  shell(@Body() body: PromptDto) {
    return this.chatShellUseCase.execute(body);
  }

  @Post("/generate-prompt")
  generatePrompt(@Body() body: PromptDto) {
    return this.chatGeneratePromptUseCase.execute(body);
  }

  @Post("/midjourney")
  midjourney(@Body() body: PromptDto) {
    return this.chatMidjourneyUseCase.execute(body);
  }

  @Post("/summarize-chat")
  summarizeChat(@Body() body: Array<{ role: string; content: string }> ) {
    return this.chatSummarizerUseCase.execute(body);
  }

  @Post("/bussiness")
  bussiness(@Body() body: PromptDto) {
    return this.chatBussinessUseCase.execute(body);
  }
}
