import { CompletionUsage } from "openai/resources";

export type PromptDto = {
    prompt: string;
    stream: boolean;
}

export type VisionPromptDto = PromptDto & {
    imageUrl: string;
}

export type PromptResponse = {
    content: string;
    usage: CompletionUsage;
    id: string;
    finish_reason?: string;
}