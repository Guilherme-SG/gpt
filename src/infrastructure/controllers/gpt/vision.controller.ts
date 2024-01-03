import { VisionPromptDto } from 'src/core/types/prompt.dto';
import { Controller, Post, Body, UseInterceptors, UploadedFile, UploadedFiles } from '@nestjs/common';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { ChatPDFUseCase } from '@use-case/vision/chat-pdf.use-case';
import { ChatVisionUseCase } from '@use-case/vision/chat-vision.use-case';
import { ChatFileUseCase } from '@use-case/vision/chat-file.use-case';

@Controller("vision")
export class VisionController {
  constructor(
    private readonly chatVisionUseCase: ChatVisionUseCase,
    private readonly chatPDFUseCase: ChatPDFUseCase,
    private readonly chatFileUseCase: ChatFileUseCase
  ) {}

  @Post("/chat")
  chat(@Body() body: VisionPromptDto ) {
    return this.chatVisionUseCase.execute(body);
  }

  @Post("/chat-file")
  @UseInterceptors(FileInterceptor('file'))
  async chatFile(
    @Body() body: VisionPromptDto, 
    @UploadedFile() file
  ) {
    return this.chatFileUseCase.execute({
      dto: body,
      files: [file.buffer]
    });
  }

  @Post("/chat-pdf")
  @UseInterceptors(FileFieldsInterceptor([
    { name: "pdf", maxCount: 1 },
    { name: "image", maxCount: 1 }
  ]))
  async promptPDF(
    @Body() body: VisionPromptDto,
    @UploadedFiles() files: Buffer
  ) {      
    return this.chatPDFUseCase.execute({
      dto: body,
      pdf: files
    });
  }
  
}
