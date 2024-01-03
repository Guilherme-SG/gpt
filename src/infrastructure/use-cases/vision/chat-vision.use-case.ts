import { CHAT_VISION_PROMPT_SERVICE } from '@constants/gpt-service.constants';
import { VisionPromptDto } from '@core-types/prompt.dto';
import { UseCase } from '@interfaces/use-case.interface';
import { Inject, Injectable } from '@nestjs/common';
import { PromptVisionGPTService } from '@services/gpt/vision/prompt-vision.service';

@Injectable()
export class ChatVisionUseCase implements UseCase {

    constructor(@Inject(CHAT_VISION_PROMPT_SERVICE) private readonly promptVisionGPTService: PromptVisionGPTService) {
        this.setupTemplate();
    }
    
    private setupTemplate(): void {
        this.promptVisionGPTService.pushSystemMessage({
            role: "system",
            content: `
            Você é um analisador de imagens e deve ajudar o usuário com suas dúvidas sobre a imagem.
            `
        })
        
    }

    execute(dto: VisionPromptDto): Promise<any> {
        return this.promptVisionGPTService.prompt(dto);
    }
}