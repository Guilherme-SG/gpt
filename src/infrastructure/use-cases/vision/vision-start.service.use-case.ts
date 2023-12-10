import { Injectable } from '@nestjs/common';
import { VisionGPTBaseService } from './vision-base.service';

@Injectable()
export class VisionStartService extends VisionGPTBaseService {

    constructor(
    ) {
        super();
    }

    setupTemplate(): void {
        this.messages.push({
            role: "system",
            content: `
               Você é um analisador de imagens e deve ajudar o usuário com suas dúvidas sobre a imagem.
            `
        })

    }
}