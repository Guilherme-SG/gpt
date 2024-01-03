import { Module } from '@nestjs/common';
import { VisionController } from '@controllers/gpt/vision.controller';
import { FileToBase64Service } from '@services/image-conversor/file-to-base64';
import { PDFToBase64Service } from '@services/image-conversor/pdf-to-base64';
import { ChatVisionUseCase } from '@use-case/vision/chat-vision.use-case';
import { ChatFileUseCase } from '@use-case/vision/chat-file.use-case';
import { ChatPDFUseCase } from '@use-case/vision/chat-pdf.use-case';
import { CHAT_VISION_PROMPT_SERVICE } from '@constants/gpt-service.constants';
import { PromptVisionGPTService } from '@services/gpt/vision/prompt-vision.service';

@Module({    
  controllers: [
    VisionController,
  ],
  providers: [
    {
      provide: CHAT_VISION_PROMPT_SERVICE,
      useClass: PromptVisionGPTService
    },
    ChatVisionUseCase,
    ChatFileUseCase,
    ChatPDFUseCase,
    FileToBase64Service,
    PDFToBase64Service,
  ],
})
export class VisionGTPModule {}