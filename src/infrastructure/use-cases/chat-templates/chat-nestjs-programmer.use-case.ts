import { Inject, Injectable } from '@nestjs/common';
import { UseCase } from '@interfaces/use-case.interface';
import { PromptDto } from '@core-types/prompt.dto';
import { BasePromptGPTService } from '@interfaces/base-prompt-gpt.service.interface';
import { CHAT_PROMPT_SERVICE } from '@constants/gpt-service.constants';

@Injectable()
export class ChatNestJSProgrammerUseCase implements UseCase {

    constructor(@Inject(CHAT_PROMPT_SERVICE) private readonly promptGPTService: BasePromptGPTService) {
        this.setupTemplate();
    }

    private setupTemplate(): void {
        this.promptGPTService.pushSystemMessage({
            role: "system",
            content: "You are a helpfull assistant in NestJS. You know all the docs about this framework."
        })
    }

    execute(args: PromptDto) {
        return this.promptGPTService.prompt(args);
    }
}