import { PromptDto, PromptResponse } from 'src/core/types/prompt.dto';
import { Controller, Post, Body, Res } from '@nestjs/common';
import { AgentChatUseCase } from '../../use-cases/agent/agent-chat.use-case';
import { AgentPromptDto } from 'src/core/types/agent-prompt.dto';

@Controller("agent")
export class AgentController {
  constructor(
    private readonly agentChatUseCase: AgentChatUseCase,
  ) { }

  @Post("/start")
  start(@Body() body: AgentPromptDto) {
    return this.agentChatUseCase.execute({
      iterations: body.iterations,
      newChat: body.newChat,
      firstMessage: body.firstMessage,
    });
  };
}
