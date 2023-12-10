import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScrapperController } from '@controllers/scrapper/scrapper.controller';
import { ScrapperService } from '@services/scrapper/scrapper.service';

@Module({  
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [ScrapperController],
  providers: [
    ScrapperService,
  ],
})
export class ScrapperModule {}