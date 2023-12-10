import { Controller, Post, Body, Get } from '@nestjs/common';
import { ScrapperService } from '@services/scrapper/scrapper.service';

@Controller("scrapper")
export class ScrapperController {
  constructor(
    private readonly scrapperService: ScrapperService,
  ) {}

  @Get("start")
  start(@Body() body ) {
    return this.scrapperService.get();
  }

}
