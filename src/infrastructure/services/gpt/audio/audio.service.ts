import { Injectable } from "@nestjs/common";
import * as fs from "node:fs";
import { PromptDto, PromptResponse } from "src/core/types/prompt.dto";
import { BasePromptGPTService } from "../base/base-prompt-gpt.service";

@Injectable()
export class AudioService extends BasePromptGPTService {
    protected model = "tts-1-hd";
    constructor() {
        super();
        this.setupTemplate();        
    }

    public setupTemplate(): void {
        this.pushSystemMessage({
            content: `Você é um especialista em diabétes tipo 1, você entende tudo sobre o assunto e tem confiança para instruir diabéticos sobre o assunto.`,
            role: "system",
        })
    }

    public async create(input: string, voice: "alloy" | "echo" | "fable" | "onyx" | "nova" | "shimmer") {
        const mp3 = await this.openai.audio.speech.create({
            model: this.model,
            voice,
            input,

        });
        const buffer = Buffer.from(await mp3.arrayBuffer());

        fs.createWriteStream(`audios/output-${voice}-${Date.now()}.mp3`).write(buffer);

    }
    public async voice(request: PromptDto) {
        const response = await this.prompt(request) as PromptResponse;
        this.create(response.content, "echo");
    }
}