import { Module } from '@nestjs/common';
import { AssistantBaseService } from '@services/gpt/assistant/assistant-base.service';
import { ThreadService } from '@services/gpt/assistant/thread.service';
import { ThreadMessageService } from '@services/gpt/assistant/thread-message.service';
import { ThreadRunService } from '@services/gpt/assistant/thread-run.service';
import { ThreadRunStepsService } from '@services/gpt/assistant/thread-run-steps.service';
import { AssistantInvestorUseCase } from '../use-cases/assistant-investor.use-case';
import { AssistantController } from '@controllers/assistant-gpt/assistant.controller';
import { ThreadController } from '@controllers/assistant-gpt/thread.controller';

@Module({    
  controllers: [
    AssistantController,
    ThreadController,
  ],
  providers: [
    AssistantBaseService,
    ThreadService,
    ThreadMessageService,
    ThreadRunService,
    ThreadRunStepsService,
    AssistantInvestorUseCase,
  ],
})
export class AssistantGTPModule {}