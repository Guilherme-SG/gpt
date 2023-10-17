import { Injectable } from '@nestjs/common';
import { GPTTemplateService } from './chat-template.service';

@Injectable()
export class ChatNestJSProgrammerService extends GPTTemplateService {

    constructor(
    ) {
        super();
    }

    setupTemplate(): void {
        this.messages.push({
            role: "system",
            content: "You are a helpfull assistant in NestJS. You know all the docs about this framework."
        })
    }
}