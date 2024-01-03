import { PromptDto } from 'src/core/types/prompt.dto';
import { Controller, Post, Body, Inject } from '@nestjs/common';
import { CHAT_FUNCTION_USECASE } from '@constants/chat-function.constants';
import { UseCase } from '@interfaces/use-case.interface';

@Controller("chat-function")
export class ChatFunctionController {
  constructor(
    @Inject(CHAT_FUNCTION_USECASE) private readonly ChatFunctionGPTUseCase: UseCase,
  ) { }

  @Post("/start")
  start(@Body() body: PromptDto) {
    return this.ChatFunctionGPTUseCase.execute(body);
  }
}
