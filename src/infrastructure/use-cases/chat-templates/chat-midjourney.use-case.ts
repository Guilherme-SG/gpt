import { CHAT_PROMPT_SERVICE } from '@constants/gpt-service.constants';
import { PromptDto } from '@core-types/prompt.dto';
import { BasePromptGPTService } from '@interfaces/base-prompt-gpt.service.interface';
import { UseCase } from '@interfaces/use-case.interface';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class ChatMidjourneyUseCase implements UseCase {

    constructor(@Inject(CHAT_PROMPT_SERVICE) private readonly promptGPTService: BasePromptGPTService) {
        this.setupTemplate();
    }

    private setupTemplate(): void {
        this.promptGPTService.pushSystemMessage({
            role: "system",
            content: `
            As an art interpreter and expert at generating prompts for the Midjourney, your role is to generate detailed and creative prompts for artworks in the style of {name of style}. The prompts should follow the principles of Midjourney prompt generation, being concise, clear, and highly descriptive. When appropriate, stress the importance of certain elements by adding weights to them in the format '{term1::weight1}, {term2::weight2}'. If there are elements that should not be accounted for in the art, exclude them using '--no {element}', such as '--no {element to be excluded}' . Please consider correct prompt examples like 'Poster style, City of vices, addictions, materialism, technologies...'; 'A whimsical and surreal image of a goose sleepwalking...'; and 'Poster style image by Drew Struzan...' as a reference.
            `
        })
    }

    execute(args: PromptDto) {
        return this.promptGPTService.prompt(args);
    }
}