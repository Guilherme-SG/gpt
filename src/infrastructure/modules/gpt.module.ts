import { Module } from '@nestjs/common';
import { ChatController } from '@controllers/chat.controller';
import { ChatFreelanceProposalService } from '@services/gpt/chat-freelance-proposal.service';
import { ChatNestJSProgrammerService } from '@services/gpt/chat-nestjs-programmer.service';
import { ChatShellService } from '@services/gpt/chat-shell.service';

@Module({    
  controllers: [ChatController],
  providers: [
    ChatFreelanceProposalService,
    ChatNestJSProgrammerService,
    ChatShellService,
  ],
})
export class GTPModule {}