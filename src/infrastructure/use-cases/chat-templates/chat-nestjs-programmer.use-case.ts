import { Injectable } from '@nestjs/common';
import { ChatTemplateGPTUseCase } from './chat-template-gpt.use-case';

@Injectable()
export class ChatNestJSProgrammerUseCase extends ChatTemplateGPTUseCase {

    constructor(
    ) {
        super();
    }

    setupTemplate(): void {
        this.pushSystemMessage({
            role: "system",
            content: "You are a helpfull assistant in NestJS. You know all the docs about this framework."
        })
    }
}