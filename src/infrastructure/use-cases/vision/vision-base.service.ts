import { VisionPromptDto } from '@entities/prompt.dto';
import { Injectable } from '@nestjs/common';
import { BasePromptGPTService } from '../../services/gpt/base/base-prompt-gpt.service';

@Injectable()
export abstract class VisionGPTBaseService extends BasePromptGPTService {
  constructor() {
    super();
    this.model = "gpt-4-vision-preview";
    this.setupTemplate()
  }

  public setupTemplate(): void {
    this.pushSystemMessage({
      role: "system",
      content: `Você é um analista de imagens. Seu trabalho é ver uma imagem, descreve-la e tirar dúvidas sobre ela.`
    })
  }

  public prompt(dto: VisionPromptDto){
    return super.prompt(dto);
  }

  getContent(dto: VisionPromptDto): Array<any> {
    const content: any = [
      { type: "text", text: dto.prompt },
    ];

    console.log(content);
    if (dto.imageUrl) {
      content.push({
        type: "image_url",
        image_url: {
          url: dto.imageUrl,
        },
      })
    }

    return content;
  }
}
