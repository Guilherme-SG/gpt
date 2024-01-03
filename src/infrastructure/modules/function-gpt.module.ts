import { Module } from '@nestjs/common';
import { ChatFunctionController } from '@controllers/gpt/chat-function.controller';
import { CHAT_FUNCTION_USECASE } from '@constants/chat-function.constants';
import { ChatFunctionGPTUseCase } from '@use-case/chat-function/chat-function-gpt.use-case.';
import { PromptWithToolGPTService } from '@services/gpt/prompt/prompt-with-tool-gpt.service';
import { CHAT_PROMPT_WITH_TOOL_SERVICE } from '@constants/gpt-service.constants';

@Module({    
  controllers: [
    ChatFunctionController,
  ],
  providers: [
    {
      provide: CHAT_FUNCTION_USECASE,
      useClass: ChatFunctionGPTUseCase    
    },
    {
      provide: CHAT_PROMPT_WITH_TOOL_SERVICE,
      useClass: PromptWithToolGPTService
    }
  ],
})
export class FunctionGTPModule {}