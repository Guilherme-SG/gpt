import { Module } from '@nestjs/common';
import { ChatFunctionController } from '@controllers/gpt/chat-function.controller';
import { ChatFunctionRandomNumber } from '@use-case/chat-function/chat-function-randomizer.use-case';

@Module({    
  controllers: [
    ChatFunctionController,
  ],
  providers: [
    ChatFunctionRandomNumber,
  ],
})
export class FunctionGTPModule {}