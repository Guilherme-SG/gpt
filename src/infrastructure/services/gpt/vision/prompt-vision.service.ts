import { VisionPromptDto } from 'src/core/types/prompt.dto';
import { Injectable } from '@nestjs/common';
import { PromptWithToolGPTService } from '../prompt/prompt-with-tool-gpt.service';

@Injectable()
export class PromptVisionGPTService extends PromptWithToolGPTService {
  protected model = "gpt-4-vision-preview";

  public prompt(dto: VisionPromptDto){
    return super.prompt(dto);
  }

  protected getContent(dto: VisionPromptDto): Array<any> {
    const content: any = [
      { type: "text", text: dto.prompt },
    ];

    console.log(content);
    
    if (dto.imageUrls) {
      dto.imageUrls.forEach(url => {
        content.push({
          type: "image_url",
          image_url: {
            url,
          },
        })
      });
      
    }

    return content;
  }
}
