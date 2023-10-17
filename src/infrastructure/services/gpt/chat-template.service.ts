import { Injectable, NotImplementedException } from '@nestjs/common';
import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources';
import { Stream } from 'openai/streaming';

@Injectable()
export abstract class GPTTemplateService {
  protected readonly messages: ChatCompletionMessageParam[] = [];
  private readonly model: string = process.env.OPENAI_MODEL;
  private readonly openai: OpenAI = new OpenAI();
  constructor(
  ) {
    this.setupTemplate();
  }

  abstract setupTemplate(): void;

  async prompt(content: string) {
    if(this.messages.length === 0) {
      throw new NotImplementedException("You must setup the template first")
    }
    
    console.log(content);
    this.messages.push({ role: "user", content })

    const completion = await this.openai.chat.completions.create({
      messages: this.messages,
      model: this.model,
      stream: true,
    });

    const result = await this.handChunk(completion);
    // const result = this.handleSingleMessage(completion);

    this.messages.push({ role: "system", content: result })
    return { result }
  }

  private handleSingleMessage(completion: OpenAI.Chat.Completions.ChatCompletion) {
    return completion.choices[0].message.content;
  }

  private async handChunk(completion: Stream<OpenAI.Chat.Completions.ChatCompletionChunk>) {
    let result = "";

    for await (const chunk of completion) {
      console.dir(chunk, { depth: Infinity });
      result += chunk.choices[0].delta?.content ?? "";
    }
    return result;
  }
}
