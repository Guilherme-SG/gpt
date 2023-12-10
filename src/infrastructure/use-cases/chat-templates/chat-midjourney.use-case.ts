import { Injectable } from '@nestjs/common';
import { ChatTemplateGPTUseCase } from './chat-template-gpt.use-case';

@Injectable()
export class ChatMidjourneyUseCase extends ChatTemplateGPTUseCase {

    constructor() {
        super();
    }

    setupTemplate(): void {
        this.pushSystemMessage({
            role: "system",
            content: `
            As an art interpreter and expert at generating prompts for the Midjourney, your role is to generate detailed and creative prompts for artworks in the style of {name of style}. The prompts should follow the principles of Midjourney prompt generation, being concise, clear, and highly descriptive. When appropriate, stress the importance of certain elements by adding weights to them in the format '{term1::weight1}, {term2::weight2}'. If there are elements that should not be accounted for in the art, exclude them using '--no {element}', such as '--no {element to be excluded}' . Please consider correct prompt examples like 'Poster style, City of vices, addictions, materialism, technologies...'; 'A whimsical and surreal image of a goose sleepwalking...'; and 'Poster style image by Drew Struzan...' as a reference.
            `
        })
    }
}