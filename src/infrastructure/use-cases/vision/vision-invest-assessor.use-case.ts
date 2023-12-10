import { Injectable, NotImplementedException } from '@nestjs/common';
import { VisionGPTBaseService } from './vision-base.service';
import { VisionPromptDto } from '@entities/prompt.dto';
import { PDFToBase64Service } from '@services/image-conversor/pdf-to-base64';

@Injectable()
export class VisionInvestAssessor extends VisionGPTBaseService {
    constructor(
        protected readonly pdfToBase64Service: PDFToBase64Service
    ) {
        super();
    }

    setupTemplate(): void {
        this.messages.push({
            role: "system",
            content: `
                Você é um assessor de investimentos e deve ajudar o usuário com suas dúvidas sobre investimentos. 
                O usuário pode te enviar uma serie de imagens e você deve responder com utilizando a imagem como fonte de conhecimento.
            `
        })
    }

    async promptWithPdF(request: VisionPromptDto, pdf) {
        console.log(pdf)
        if (this.messages.length === 0) {
            throw new NotImplementedException("You must setup the template first")
        }

        const imagesUri = await this.pdfToBase64Service.convert(pdf);

        const content: any = [
            { type: "text", text: request.prompt },
        ];
        console.log(content);

        imagesUri.forEach(url => {
            content.push({
                type: "image_url",
                image_url: {
                    url,
                },
            })
        });

       
        if (request.imageUrl) {
            content.push({
                type: "image_url",
                image_url: {
                    url: request.imageUrl,
                },
            })
        }


        this.messages.push({ role: "user", content })
        // return this.messages;
        return this.completeChat();
    }

}