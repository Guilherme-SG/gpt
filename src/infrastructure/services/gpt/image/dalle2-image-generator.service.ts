import { Injectable } from "@nestjs/common";
import OpenAI from "openai";
import { BaseImageGeneratorService } from "./base-image-generator.service";

@Injectable()
export class DalleImageGeneratorService extends BaseImageGeneratorService {
    protected readonly openai: OpenAI = new OpenAI();
    protected model = "dall-e-3";

    public async generate(options: OpenAI.Images.ImageGenerateParams) {
        const { data: [{ url }] } = await this.openai.images.generate(options);
        return url;
    }
}