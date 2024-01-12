import { Module } from '@nestjs/common';
import { VillainAgentService } from '@services/gpt/agents/villain-agent.service';
import { HeroAgentService } from '@services/gpt/agents/hero-agent.service';
import { AgentChatUseCase } from '../use-cases/agent/agent-chat.use-case';
import { AgentController } from '@controllers/gpt/agent.controller';
import { ChatGPTModule } from './gpt.module';
import { HERO_AGENT_SERVICE, VILLAIN_AGENT_SERVICE } from 'src/core/constants/agent.constants';

@Module({
  imports: [
    ChatGPTModule,
  ],
  controllers: [
    AgentController
  ],
  providers: [
    AgentChatUseCase,
    {
      provide: HERO_AGENT_SERVICE,
      useClass: HeroAgentService,
    },
    {
      provide: VILLAIN_AGENT_SERVICE,
      useClass: VillainAgentService,
    },
  ],
})
export class AgentGTPModule {}