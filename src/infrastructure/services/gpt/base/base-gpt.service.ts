import OpenAI from "openai";

export abstract class BaseGPTService {
    protected readonly openai: OpenAI = new OpenAI();
    protected model: string = "gpt-4-1106-preview";
    protected maxTokens: number = 2048;
}