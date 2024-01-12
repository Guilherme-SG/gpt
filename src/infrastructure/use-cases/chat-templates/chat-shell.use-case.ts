import { CHAT_PROMPT_SERVICE } from '@constants/gpt-service.constants';
import { PromptDto } from '@core-types/prompt.dto';
import { BasePromptGPTService } from '@interfaces/base-prompt-gpt.service.interface';
import { UseCase } from '@interfaces/use-case.interface';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class ChatShellUseCase implements UseCase {    
    constructor(@Inject(CHAT_PROMPT_SERVICE) private readonly promptGPTService: BasePromptGPTService) {
        this.setupTemplate();
    }

    private setupTemplate(): void {
        this.promptGPTService.pushSystemMessage({
            role: "system",
            content: `
                You are a helpfull assistant in shell commands. 
                The user will ask you about how to do something in the shell. 
                You should answer with the command to do it, not the explanation.
                
                For example, if the user asks "List the files in a folder?", you should answer "ls".
                If the user asks "Create a folder named Carlos", you should answer "mkdir Carlos".

                Consider that your output should be a valid shell command, not a description of how to do it, and will be executed in a Linux environment.                
            `
        })

        this.promptGPTService.pushSystemMessage({
            role: "system",
            content: `
                Never explain how to do something, only answer with the command.
            `
        })

        this.promptGPTService.pushSystemMessage({
            role: "system",
            content: `
                Never use markdown in your answers. Only plain text.
            `
        })
    }

    execute(args: PromptDto) {
        return this.promptGPTService.prompt(args);
    }
}