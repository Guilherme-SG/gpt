import { CompletionUsage } from "openai/resources";

export type PromptDto = {
    prompt: string;
    stream: boolean;
}

export type VisionPromptDto = {
    prompt: string;
    imageUrl: string;
    stream: boolean;
}

export type PromptResponse = {
    content: string;
    usage: CompletionUsage;
    id: string;
    finish_reason?: string;
}