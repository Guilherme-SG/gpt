import { CompletionUsage } from "openai/resources";

export class PromptDto {
    prompt: string;
    stream: boolean;
}

export class VisionPromptDto {
    prompt: string;
    imageUrl: string;
    stream: boolean;
}

export class PromptResponse {
    content: string;
    usage: CompletionUsage;
    id: string;
    finish_reason?: string;
}