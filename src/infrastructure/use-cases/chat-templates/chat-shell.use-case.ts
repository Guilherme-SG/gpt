import { Injectable } from '@nestjs/common';
import { ChatTemplateGPTUseCase } from './chat-template-gpt.use-case';

@Injectable()
export class ChatShellUseCase extends ChatTemplateGPTUseCase {
    protected readonly ignoreSetup: boolean = true;
    constructor() {
        super();
    }

    setupTemplate(): void {
        this.pushSystemMessage({
            role: "system",
            content: `
                You are a helpfull assistant in shell commands. 
                The user will ask you about how to do something in the shell. 
                You should answer with the command to do it, not the explanation.
            `
        })
    }
}