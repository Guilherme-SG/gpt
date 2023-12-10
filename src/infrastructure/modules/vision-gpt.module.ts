import { Module } from '@nestjs/common';
import { VisionController } from '@controllers/gpt/vision.controller';
import { VisionStartService } from '@use-case/vision/vision-start.service.use-case';
import { ImageToBase64Service } from '@services/image-conversor/image-to-base64';
import { PDFToBase64Service } from '@services/image-conversor/pdf-to-base64';
import { VisionInvestAssessor } from '@use-case/vision/vision-invest-assessor.use-case';

@Module({    
  controllers: [
    VisionController,
  ],
  providers: [
    VisionStartService,
    VisionInvestAssessor,
    ImageToBase64Service,
    PDFToBase64Service,
  ],
})
export class VisionGTPModule {}