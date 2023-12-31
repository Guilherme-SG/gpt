import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources";
import { PromptDto, PromptResponse } from "src/core/types/prompt.dto";
import { ChatCompletionStream } from "openai/lib/ChatCompletionStream";
import { BasePromptGPTService } from "@interfaces/base-prompt-gpt.service.interface";

export class PromptGPTService implements BasePromptGPTService {   
    protected readonly openai: OpenAI = new OpenAI();     
    protected model: string = "gpt-4-1106-preview";
    protected maxTokens: number = 2048;
    protected messages: ChatCompletionMessageParam[] = [];
    protected systemMessages: ChatCompletionMessageParam[] = [];

    public async prompt(dto: PromptDto) {
        const content = this.getContent(dto);
        this.messages.push({ role: "user", content })


        console.dir(this.messages, { depth: Infinity })
        return dto.stream ? this.completeChatStream() : this.completeChat();
    }

    protected getContent(dto: PromptDto): string | Array<any> {
        return dto.prompt
    }

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

        this.messages.push({ role: "assistant", content: result.content });
        console.dir(this.messages, { depth: Infinity })
        return result;
    }

    public completeChatStream() {
        return this.openai.beta.chat.completions.stream({
            messages: this.messages,
            model: this.model,
            max_tokens: this.maxTokens,
        });
    }

    public isResponseStreamed(response: ChatCompletionStream | PromptResponse): response is ChatCompletionStream {
       return response instanceof ChatCompletionStream;
    }
}