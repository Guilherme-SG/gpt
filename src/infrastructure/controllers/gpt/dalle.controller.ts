import { DALLE2_SERVICE, DALLE3_SERVICE } from "@constants/dalle.constants";
import { Body, Controller, Inject, Post, Res } from "@nestjs/common";
import { BaseImageGeneratorService } from "@services/gpt/image/base-image-generator.service";
import { Response } from "express";
import OpenAI from "openai";

@Controller("dalle")
export class DalleController {
    constructor(
        @Inject(DALLE2_SERVICE) private readonly dalleImageGeneratorService: BaseImageGeneratorService,
    ) { }

    @Post("/")
    async generate(
        @Body() body: OpenAI.Images.ImageGenerateParams,
        @Res() res:  Response
    ) {
        const url = await this.dalleImageGeneratorService.generate(body);
        const html = `<!DOCTYPE html><html><body><img src="${url}" /></body></html>`;
        res.send(html)
    };
}