import { Injectable } from "@nestjs/common";
import * as fs from "node:fs";
import OpenAI from "openai";

@Injectable()
export class AudioService {   
    protected readonly openai: OpenAI = new OpenAI();     
    protected model = "tts-1-hd";
    
    public async create(input: string, voice: "alloy" | "echo" | "fable" | "onyx" | "nova" | "shimmer") {
        const mp3 = await this.openai.audio.speech.create({
            model: this.model,
            voice,
            input,

        });
        const buffer = Buffer.from(await mp3.arrayBuffer());
        fs.createWriteStream(`audios/output-${voice}-${Date.now()}.mp3`).write(buffer);
    }
   
}