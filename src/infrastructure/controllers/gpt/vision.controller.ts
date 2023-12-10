import { VisionPromptDto } from '@entities/prompt.dto';
import { Controller, Post, Body, UseInterceptors, UploadedFile, UploadedFiles } from '@nestjs/common';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { VisionInvestAssessor } from '@use-case/vision/vision-invest-assessor.use-case';
import { VisionStartService } from '@use-case/vision/vision-start.service.use-case';
import { ImageToBase64Service } from '@services/image-conversor/image-to-base64';

@Controller("vision")
export class VisionController {
  constructor(
    private readonly visionStartService: VisionStartService,
    private readonly visionInvestAssessor: VisionInvestAssessor,
    private readonly imageToBase64Service: ImageToBase64Service
  ) {}

  @Post("/start")
  start(@Body() body: VisionPromptDto ) {
    return this.visionStartService.prompt(body);
  }

  @Post("/start-with-local-image")
  @UseInterceptors(FileInterceptor('file'))
  async startWithLocalImage(
    @Body() body: VisionPromptDto, 
    @UploadedFile() file
  ) {
    console.log(body)
    if(file) {
      body.imageUrl = await this.imageToBase64Service.convert(file.buffer);
    }
    
    return this.visionStartService.prompt(body);
  }

  @Post("/invest-assessor")
  @UseInterceptors(FileFieldsInterceptor([
    { name: "pdf", maxCount: 1 },
    { name: "image", maxCount: 1 }
  ]))
  async promptPDF(
    @Body() body: VisionPromptDto,
    @UploadedFiles() files: { pdf: any, image: any },
  ) {
    let { pdf, image } = files;
    
    if(pdf) {
      return this.visionInvestAssessor.promptWithPdF(body, pdf[0].buffer);
    }
    
    if(image) {
      body.imageUrl = await this.imageToBase64Service.convert(image[0].buffer);
    }
    
    return this.visionInvestAssessor.prompt(body);
  }

  @Post("/reset") 
  reset() {
    this.visionStartService.resetMessages();
    return { message: "Chat reseted" }
  }
}
