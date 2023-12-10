import { PromptDto, PromptResponse } from '@entities/prompt.dto';
import { Controller, Post, Body, Res } from '@nestjs/common';
import { AgentChatUseCase } from '../../use-cases/agent-chat.use-case';
import { AgentPromptDto } from '@entities/agent-prompt.dto';

@Controller("agent")
export class AgentController {
  constructor(
    private readonly agentChatUseCase: AgentChatUseCase,
  ) { }

  @Post("/start")
  start(@Body() body: AgentPromptDto) {
    return this.agentChatUseCase.chat({
      iterations: body.iterations,
      newChat: body.newChat,
      firstMessage: body.firstMessage,
    });
  };
}
