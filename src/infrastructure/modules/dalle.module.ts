import { Module } from '@nestjs/common';
import { DalleController } from '@controllers/gpt/dalle.controller';
import { DALLE2_SERVICE } from '@constants/dalle.constants';
import { DalleImageGeneratorService } from '@services/gpt/image/dalle2-image-generator.service';

@Module({
  controllers: [
    DalleController,
  ],
  providers: [
    {
      provide: DALLE2_SERVICE,
      useClass: DalleImageGeneratorService, 
    }
  ],
})
export class DalleModule {}