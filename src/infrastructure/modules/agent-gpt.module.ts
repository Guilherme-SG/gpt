import { Module } from '@nestjs/common';
import { VillainAgentService } from '@services/gpt/agents/villain-agent.service';
import { HeroAgentService } from '@services/gpt/agents/hero-agent.service';
import { AgentChatUseCase } from '../use-cases/agent-chat.use-case';
import { AgentController } from '@controllers/gpt/agent.controller';
import { ChatGTPModule } from './gpt.module';

@Module({
  imports: [
    ChatGTPModule
  ],
  controllers: [
    AgentController
  ],
  providers: [
    VillainAgentService,
    HeroAgentService,
    AgentChatUseCase
  ],
})
export class AgentGTPModule {}