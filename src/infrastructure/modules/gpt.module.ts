import { Module, Scope } from '@nestjs/common';
import { ChatController } from '@controllers/gpt/chat.controller';
import { ChatGeneratePromptUseCase } from '@use-case/chat-templates/chat-generate-prompt.use-case';
import { ChatSummarizerUseCase } from '../use-cases/chat-templates/chat-sumarizer.use-case';
import { ChatFreelanceProposalUseCase } from '@use-case/chat-templates/chat-freelance-proposal.use-case';
import { ChatNestJSProgrammerUseCase } from '@use-case/chat-templates/chat-nestjs-programmer.use-case';
import { ChatShellUseCase } from '@use-case/chat-templates/chat-shell.use-case';
import { ChatMidjourneyUseCase } from '@use-case/chat-templates/chat-midjourney.use-case';
import { AudioService } from '@services/gpt/audio/audio.service';
import { ChatBussinessUseCase } from '@use-case/chat-templates/chat-bussiness.use-case';
import { CHAT_PROMPT_SERVICE } from '@constants/gpt-service.constants';
import { PromptGPTService } from '@services/gpt/prompt/prompt-gpt.service';

@Module({
  controllers: [
    ChatController,
  ],
  providers: [
    {
      provide: CHAT_PROMPT_SERVICE,
      useClass: PromptGPTService,  
      scope: Scope.TRANSIENT,
    },
    ChatFreelanceProposalUseCase,
    ChatNestJSProgrammerUseCase,
    ChatShellUseCase,
    ChatGeneratePromptUseCase,
    ChatMidjourneyUseCase,
    ChatSummarizerUseCase,
    ChatBussinessUseCase,
    AudioService
  ],
  exports: [
    ChatShellUseCase,
    ChatSummarizerUseCase,
  ],
})
export class ChatGTPModule {}