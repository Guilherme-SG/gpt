import { PromptDto, PromptResponse } from '@entities/prompt.dto';
import { Controller, Post, Body, Res } from '@nestjs/common';
import { ChatFunctionRandomNumber } from '@use-case/chat-function/chat-function-randomizer.use-case';

@Controller("chat-function")
export class ChatFunctionController {
  constructor(
    private readonly chatFunctionRandomNumber: ChatFunctionRandomNumber,
  ) { }

  @Post("/start")
  start(@Body() body: PromptDto) {
    return this.chatFunctionRandomNumber.prompt(body);
  }
}
