import { Injectable } from '@nestjs/common';
import { BasePromptGPTService } from '../../services/gpt/base/base-prompt-gpt.service';
import { PromptDto } from '@entities/prompt.dto';

@Injectable()
export abstract class ChatTemplateGPTUseCase extends BasePromptGPTService {
  constructor() {
    super()
  }

  getContent(dto: PromptDto): string {
    return dto.prompt;
  }

  public prompt(dto: PromptDto){
    return super.prompt(dto);
  }
}