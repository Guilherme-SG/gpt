import { CHAT_VISION_PROMPT_SERVICE } from '@constants/gpt-service.constants';
import { VisionPromptDto } from '@core-types/prompt.dto';
import { BasePromptGPTService } from '@interfaces/base-prompt-gpt.service.interface';
import { UseCase } from '@interfaces/use-case.interface';
import { Inject, Injectable } from '@nestjs/common';
import { FileToBase64Service } from '@services/image-conversor/file-to-base64';

@Injectable()
export class ChatFileUseCase implements UseCase {

    constructor(
        @Inject(CHAT_VISION_PROMPT_SERVICE) private readonly promptVisionGPTService: BasePromptGPTService,
        private readonly fileToBase64Service: FileToBase64Service,
    ) {
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

    public async execute(options: {
        dto: VisionPromptDto,
        files: Buffer[]
    }): Promise<any> {
        const { dto, files } = options;
        
        for (const file of files) {
            const imageUrl = await this.fileToBase64Service.convertToBase64DataUri(file)
            dto.imageUrls.push(imageUrl)
        }

        return this.promptVisionGPTService.prompt(dto);
    }
}