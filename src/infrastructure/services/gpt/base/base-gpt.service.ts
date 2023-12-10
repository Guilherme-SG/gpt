import OpenAI from "openai";

export abstract class BaseGPTService {
    protected readonly openai: OpenAI = new OpenAI();
    protected model: string;
    protected maxTokens: number = 2048;
}