import { Module } from '@nestjs/common';
import { ChatController } from '@controllers/gpt/chat.controller';
import { ChatGeneratePromptUseCase } from '@use-case/chat-templates/chat-generate-prompt.use-case';
import { ChatSummarizerUseCase } from '../use-cases/chat-sumarizer.use-case';
import { ChatFreelanceProposalUseCase } from '@use-case/chat-templates/chat-freelance-proposal.use-case';
import { ChatNestJSProgrammerUseCase } from '@use-case/chat-templates/chat-nestjs-programmer.use-case';
import { ChatShellUseCase } from '@use-case/chat-templates/chat-shell.use-case';
import { ChatMidjourneyUseCase } from '@use-case/chat-templates/chat-midjourney.use-case';

@Module({
  controllers: [
    ChatController,
  ],
  providers: [
    ChatFreelanceProposalUseCase,
    ChatNestJSProgrammerUseCase,
    ChatShellUseCase,
    ChatGeneratePromptUseCase,
    ChatMidjourneyUseCase,
    ChatSummarizerUseCase,
  ],
  exports: [
    ChatSummarizerUseCase,
  ],
})
export class ChatGTPModule {}