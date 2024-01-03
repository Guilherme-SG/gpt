import { Inject, Injectable } from '@nestjs/common';
import { VisionPromptDto } from 'src/core/types/prompt.dto';
import { PDFToBase64Service } from '@services/image-conversor/pdf-to-base64';
import { BasePromptGPTService } from '@interfaces/base-prompt-gpt.service.interface';
import { UseCase } from '@interfaces/use-case.interface';
import { CHAT_VISION_PROMPT_SERVICE } from '@constants/gpt-service.constants';

@Injectable()
export class ChatPDFUseCase implements UseCase {
    constructor(
        @Inject(CHAT_VISION_PROMPT_SERVICE) private readonly promptVisionGPTService: BasePromptGPTService,
        protected readonly pdfToBase64Service: PDFToBase64Service,
    ) {
        this.setupTemplate();
    }

    setupTemplate(): void {
        this.promptVisionGPTService.pushSystemMessage({
            role: "system",
            content: `
                Você é um assessor de investimentos e deve ajudar o usuário com suas dúvidas sobre investimentos. 
                O usuário pode te enviar uma serie de imagens e você deve responder com utilizando a imagem como fonte de conhecimento.
            `
        })
    }

    async execute(options: {
        dto: VisionPromptDto, 
        pdf: Buffer
    }) {
        const { dto, pdf } = options;

        if(pdf) {
            const imagesUri = await this.pdfToBase64Service.convert(pdf);

            imagesUri.forEach(url => 
                dto.imageUrls.push(url)
            );
        }

        return this.promptVisionGPTService.prompt(dto);
    }

}