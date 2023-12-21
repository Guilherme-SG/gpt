import { Injectable } from "@nestjs/common";
import { BasePromptWithToolGPTService } from "../base/base-prompt-with-tool-gpt.service";

const players = [
    "mplayer",
    "afplay",
    "mpg123",
    "mpg321",
    "play",
    "omxplayer",
    "aplay",
    "cmdmp3",
    "vlc",
    "powershell",
];

const player = require('play-sound')({ players })
import * as fs from "node:fs";
import { PromptDto, PromptResponse } from "@entities/prompt.dto";
import { BasePromptGPTService } from "../base/base-prompt-gpt.service";

@Injectable()
export class AudioService extends BasePromptGPTService {
    constructor() {
        super();
        this.model = "gpt-4";
        this.setupTemplate();
        // this.voice({ prompt: "Explique como o TNF-alpha atrapalha no crescimento muscular do diabético", stream: false })
    }

    protected setTools(): void {
        // throw new Error("Method not implemented.");
    }

    public setupTemplate(): void {
        this.pushSystemMessage({
            content: `Você é um especialista em diabétes tipo 1, você entende tudo sobre o assunto e tem confiança para instruir diabéticos sobre o assunto.`,
            role: "system",
        })
    }

    protected getContent(dto: PromptDto): string | any[] {
        return dto.prompt
    }

    public async create(input: string, voice: "alloy" | "echo" | "fable" | "onyx" | "nova" | "shimmer") {
        // const speechFile = path.resolve("./");
        const mp3 = await this.openai.audio.speech.create({
            model: "tts-1-hd",
            voice,
            input,

        });
        // console.log(speechFile);
        const buffer = Buffer.from(await mp3.arrayBuffer());

        fs.createWriteStream(`audios/output-${voice}-${Date.now()}.mp3`).write(buffer);

    }

    // public async translate() {
    //     this.openai.audio.translations.create({
    //         model
    //     })
    // }

    public async voice(request: PromptDto) {
        const response = await this.prompt(request) as PromptResponse;
        this.create(response.content, "echo");
    }

    public play(filename: string) {
        player.play(filename, function (err) {
            if (err) throw err
        })


    }
}