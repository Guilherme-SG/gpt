import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScraperController } from '@controllers/scraper/scraper.controller';
import { ScraperService } from '@services/scraper/scraper.service';
import { AliexpressScraperUseCase } from '@use-case/scraper/aliexpress-scraper.use-case';
import { AmazonScraperUseCase } from '@use-case/scraper/amazon-scraper.use-case';

@Module({  
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [ScraperController],
  providers: [
    ScraperService,
    AliexpressScraperUseCase,
    AmazonScraperUseCase,
  ],
})
export class ScraperModule {}