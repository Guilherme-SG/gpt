import { BasePromptGPTService } from "./base-prompt-gpt.service";
import { ChatCompletionMessageParam, ChatCompletionTool, ChatCompletionToolChoiceOption } from "openai/resources";
import { PromptResponse } from "@entities/prompt.dto";

export abstract class BasePromptWithToolGPTService extends BasePromptGPTService {
    protected maxTokens: number = 1000;
    protected messages: ChatCompletionMessageParam[] = [];
    protected tools: Array<ChatCompletionTool> = [];
    protected toolChoice: ChatCompletionToolChoiceOption;
    protected toolFunctions: any = {};

    constructor() {
        super();
        this.setTools();
    }

    protected abstract setTools(): void;
    
    public async completeChat() {
        const completion = await this.openai.chat.completions.create({
            messages: this.messages,
            model: this.model,
            max_tokens: this.maxTokens,
            tools: this.tools,
            tool_choice: this.toolChoice,
        });

        console.dir(completion, { depth: Infinity})

        const [choice] = completion.choices;
        const result: PromptResponse = {
            content: choice.message.content,
            usage: completion.usage,
            id: completion.id,
            finish_reason: choice.finish_reason,
        }

        if(choice.finish_reason === "tool_calls") {
            result["toolCalls"] = choice.message.tool_calls;
            result["toolCallResponse"] = await this.handleToolCalls(choice.message.tool_calls);
            
            result["totalUsage"] = {
                prompt_tokens: result.usage.prompt_tokens + result["toolCallResponse"].usage.prompt_tokens,
                completion_tokens: result.usage.completion_tokens + result["toolCallResponse"].usage.completion_tokens,
                total_tokens: result.usage.total_tokens + result["toolCallResponse"].usage.total_tokens,
            }
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
            tools: this.tools,
            tool_choice: this.toolChoice,
        });

        for await (const chunk of completion ) {
            yield chunk.choices[0].delta.content;
            
        }

        yield await completion.totalUsage();
    }

    private async handleToolCalls(toolCalls: any[], stream: boolean = false) {
        for(const toolCall of toolCalls) {
            if(toolCall.type !== "function") continue;
                        
            const { name, arguments: parameters } = toolCall.function;
            console.log(name, parameters)
            const result = await this.toolFunctions[name](JSON.parse(parameters));
           
            this.messages.push({
                role: "system",
                content: `You have called the tool ${name} with the parameters ${JSON.stringify(parameters)} and the result was ${JSON.stringify(result)}`
            })
        }

        return stream ? this.completeChatStream() : this.completeChat();
    }
}