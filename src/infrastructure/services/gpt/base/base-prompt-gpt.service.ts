import { BaseGPTService } from "./base-gpt.service";
import { ChatCompletionMessageParam } from "openai/resources";
import { NotImplementedException } from "@nestjs/common";
import { PromptResponse } from "@entities/prompt.dto";

export abstract class BasePromptGPTService extends BaseGPTService {
    protected messages: ChatCompletionMessageParam[] = [];
    protected systemMessages: ChatCompletionMessageParam[] = [];

    constructor() {
        super();
    }

    public async prompt(dto) {
        console.log(this.messages)
        if(this.messages.length === 0) {
            throw new NotImplementedException("You must setup the template first")
          }
      
          const content = this.getContent(dto);      
          this.messages.push({ role: "user", content })      
          
          return dto.stream ? this.completeChatStream() : this.completeChat();
    }

    protected abstract setupTemplate(): void;
    protected abstract getContent(dto): string | Array<any>;

    public pushSystemMessage(message: ChatCompletionMessageParam) {
        this.systemMessages.push(message);
        this.messages.push(message);
    }

    public resetMessages() {
        this.messages = this.systemMessages;
    }
    
    public async completeChat() {
        const completion = await this.openai.chat.completions.create({
            messages: this.messages,
            model: this.model,
            max_tokens: this.maxTokens,
        });

        const result: PromptResponse = {
            content: completion.choices[0].message.content,
            usage: completion.usage,
            id: completion.id,
        }

        console.log(this.messages)
        this.messages.push({ role: "assistant", content: result.content });
        return result;
    }

    public async *completeChatStream() {
        const completion  = await this.openai.beta.chat.completions.stream({
            messages: this.messages,
            model: this.model,
            max_tokens: this.maxTokens,
        });

        for await (const chunk of completion ) {
            yield chunk.choices[0].delta.content;
            
        }

        yield await completion.totalUsage();
    }
}