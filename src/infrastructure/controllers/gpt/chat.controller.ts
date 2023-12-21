import { Response } from 'express';
import { PromptDto, PromptResponse } from '@entities/prompt.dto';
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
    private readonly chatFreelanceProposalUseCasee: ChatFreelanceProposalUseCase,
    private readonly chatNestJSProgrammerUseCase: ChatNestJSProgrammerUseCase,
    private readonly chatShellUseCase: ChatShellUseCase,
    private readonly chatGeneratePromptUseCase: ChatGeneratePromptUseCase,
    private readonly chatMidjourneyUseCase: ChatMidjourneyUseCase,
    private readonly chatSummarizerUseCase: ChatSummarizerUseCase,
    private readonly chatBussinessUseCase: ChatBussinessUseCase,
  ) { }

  @Post("/freelance-proposal")
  freelancerProposall(@Body() body: PromptDto) {
    return this.chatFreelanceProposalUseCasee.prompt(body);
  }

  @Post("/programmer")
  async programmer(
    @Body() body: PromptDto,
    @Res() res: Response
  ) {
    const result = await this.chatNestJSProgrammerUseCase.prompt(body);
    
    
    if (result instanceof PromptResponse) return result;

    let content;
    do {
      content = await result.next()
      console.log(typeof content.value, content)
      switch(true) {
        case typeof content.value === "object":
          console.log(JSON.stringify(content.value))
          res.write(JSON.stringify(content.value));
          break;
        case typeof content.value === "string":
          res.write(content.value);
          break;
      }
    } while(!content.done)
  }


  @Post("/shell")
  shell(@Body() body: PromptDto) {
    return this.chatShellUseCase.prompt(body);
  }

  @Post("/generate-prompt")
  generatePrompt(@Body() body: PromptDto) {
    return this.chatGeneratePromptUseCase.prompt(body);
  }

  @Post("/midjourney")
  midjourney(@Body() body: PromptDto) {
    return this.chatMidjourneyUseCase.prompt(body);
  }

  @Post("/summarize-chat")
  summarizeChat(@Body() body: Array<{ role: string; content: string }> ) {
    return this.chatSummarizerUseCase.summarize(body);
  }

  @Post("/bussiness")
  bussiness(@Body() body: PromptDto) {
    return this.chatBussinessUseCase.prompt(body);
  }
}
