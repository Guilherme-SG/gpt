import { PromptDto } from '@entities/prompt.dto';
import { Controller, Post, Body } from '@nestjs/common';
import { ChatFreelanceProposalService } from '@services/gpt/chat-freelance-proposal.service';
import { ChatNestJSProgrammerService } from '@services/gpt/chat-nestjs-programmer.service';
import { ChatShellService } from '@services/gpt/chat-shell.service';

@Controller("chat")
export class ChatController {
  constructor(
    private readonly chatFreelanceProposalService: ChatFreelanceProposalService,
    private readonly chatNestJSProgrammerService: ChatNestJSProgrammerService,
    private readonly chatShellService: ChatShellService,
  ) {}

  @Post("/freelance-proposal")
  freelancerProposall(@Body() body: PromptDto ) {
    return this.chatFreelanceProposalService.prompt(body.prompt);
  }

  @Post("/programmer")
  programmer(@Body() body: PromptDto ) {
    return this.chatNestJSProgrammerService.prompt(body.prompt);
  }


  @Post("/shell")
  shell(@Body() body: PromptDto ) {
    return this.chatShellService.prompt(body.prompt);
  }
}