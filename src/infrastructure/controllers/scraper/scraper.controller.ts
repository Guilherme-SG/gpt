import { Controller, Post, Body, Get } from '@nestjs/common';
import { AliexpressScraperUseCase } from '@use-case/scraper/aliexpress-scraper.use-case';
import { AmazonScraperUseCase } from '@use-case/scraper/amazon-scraper.use-case';

@Controller("scraper")
export class ScraperController {
  constructor(
    private readonly aliexpressScraperUseCase: AliexpressScraperUseCase,
    private readonly amazonScraperUseCase: AmazonScraperUseCase,
  ) {}

  @Get("aliexpress")
  aliexpress() {
    return this.aliexpressScraperUseCase.execute();
  }

  @Get("amazon")
  amazon() {
    return this.amazonScraperUseCase.execute();
  }

}
