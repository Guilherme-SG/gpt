import { Controller, Post, Body, Get } from '@nestjs/common';
import { AliexpressScraperUseCase } from '@use-case/scraper/aliexpress-scraper.use-case';
import { AmazonScraperUseCase } from '@use-case/scraper/amazon-scraper.use-case';
import { KabumScraperUseCase } from '@use-case/scraper/kabum-scraper.use-case';
import { TiktokScraperUseCase } from '@use-case/scraper/tiktok-scraper.use-case';

@Controller("scraper")
export class ScraperController {
  constructor(
    private readonly aliexpressScraperUseCase: AliexpressScraperUseCase,
    private readonly amazonScraperUseCase: AmazonScraperUseCase,
    private readonly kabumScraperUseCase: KabumScraperUseCase,
    private readonly tiktokScraperUseCase: TiktokScraperUseCase,
  ) {}

  @Get("aliexpress")
  aliexpress() {
    return this.aliexpressScraperUseCase.execute();
  }

  @Get("amazon")
  amazon() {
    return this.amazonScraperUseCase.execute();
  }


  @Get("kabum")
  kabum() {
    return this.kabumScraperUseCase.execute();
  }

  @Get("tiktok")
  tiktok() {
    return this.tiktokScraperUseCase.execute();
  }
}
