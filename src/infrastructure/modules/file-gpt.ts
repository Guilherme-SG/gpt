import { Module } from '@nestjs/common';
import { FileToBase64Service } from '@services/image-conversor/file-to-base64';
import { PDFToBase64Service } from '@services/image-conversor/pdf-to-base64';
import { FileService } from '@services/gpt/assistant/file.service';
import { FileController } from '@controllers/file-gpt/file.controller';

@Module({    
  controllers: [
    FileController,
  ],
  providers: [
    FileToBase64Service,
    PDFToBase64Service,
    FileService,
  ],
})
export class FileGTPModule {}