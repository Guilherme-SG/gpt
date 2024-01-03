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
            `
        })
    }

    execute(args: PromptDto) {
        return this.promptGPTService.prompt(args);
    }
}