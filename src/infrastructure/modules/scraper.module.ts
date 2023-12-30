import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScraperController } from '@controllers/scraper/scraper.controller';
import { AliexpressScraperUseCase } from '@use-case/scraper/aliexpress-scraper.use-case';
import { AmazonScraperUseCase } from '@use-case/scraper/amazon-scraper.use-case';
import { KabumScraperUseCase } from '@use-case/scraper/kabum-scraper.use-case';
import { TiktokScraperUseCase } from '@use-case/scraper/tiktok-scraper.use-case';
import { PuppeteerService } from '@services/scraper/puppeteer.service';
import { BROWSER_SERVICE } from '@constants/browser.constants';

@Module({  
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [ScraperController],
  providers: [
    {
      provide: BROWSER_SERVICE,
      useClass: PuppeteerService,    
    },
    AliexpressScraperUseCase,
    AmazonScraperUseCase,
    KabumScraperUseCase,
    TiktokScraperUseCase,
  ],
})
export class ScraperModule {}