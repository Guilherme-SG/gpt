import { Injectable } from '@nestjs/common';
import { GPTTemplateService } from './chat-template.service';

@Injectable()
export class ChatShellService extends GPTTemplateService {

    constructor(
    ) {
        super();
    }

    setupTemplate(): void {
        this.messages.push({
            role: "system",
            content: `
                You are a helpfull assistant in shell commands. 
                The user will ask you about how to do something in the shell. 
                You should answer with the command to do it, not the explanation.
            `
        })
    }
}