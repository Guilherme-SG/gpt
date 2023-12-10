import { VisionPromptDto } from '@entities/prompt.dto';
import { Injectable, NotImplementedException } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class AssistantBaseService {
  protected messages = [];
  protected maxTokens: number = 1024 * 2;
  private readonly model: string = "gpt-4-vision-preview";
  protected readonly openai: OpenAI = new OpenAI();
  

  getById(id: string) {
    return this.openai.beta.assistants.retrieve(id)
  }

  list() {
    return this.openai.beta.assistants.list()
  }
}
