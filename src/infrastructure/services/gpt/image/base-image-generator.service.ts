import OpenAI from "openai";

export abstract class BaseImageGeneratorService {
    protected readonly openai: OpenAI = new OpenAI();     
    protected model: string;

    abstract generate(options);
}