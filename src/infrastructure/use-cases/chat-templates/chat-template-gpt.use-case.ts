import { Injectable } from '@nestjs/common';
import { BasePromptGPTService } from '../../services/gpt/base/base-prompt-gpt.service';
import { PromptDto } from 'src/core/types/prompt.dto';
import { UseCase } from '@interfaces/use-case.interface';

@Injectable()
export abstract class ChatTemplateGPTUseCase extends BasePromptGPTService implements UseCase {
  constructor() {
    super()
  }
  
  getContent(dto: PromptDto): string {
    return dto.prompt;
  }

  execute<ReturnType>(...args: any[]): Promise<ReturnType> {
    throw new Error('Method not implemented.');
  }
}