import { PromptDto, PromptResponse } from "@core-types/prompt.dto";
import { ChatCompletionStream } from "openai/lib/ChatCompletionStream";
import { ChatCompletionMessageParam, ChatCompletionTool } from "openai/resources";

export interface BasePromptGPTService {
    prompt(dto: PromptDto): Promise<ChatCompletionStream | PromptResponse>
    pushSystemMessage(message: ChatCompletionMessageParam): void
    resetMessages(): void
    completeChat(): Promise<PromptResponse>
    completeChatStream(): ChatCompletionStream
    isResponseStreamed(response: ChatCompletionStream | PromptResponse): boolean
}

export interface BasePromptWithToolGPTService extends BasePromptGPTService {
    addTool(tool: ChatCompletionTool, functionReference: Function): void
}