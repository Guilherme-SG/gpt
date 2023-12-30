import { BrowserService, IPage } from "@interfaces/browser.service.interface";
import { Injectable } from "@nestjs/common";
import { Browser, Page } from "puppeteer";
import puppeteer from 'puppeteer-extra';
const StealthPlugin = require('puppeteer-extra-plugin-stealth')

export type PuppeterPageOptions = {
  url: string,
  viewport?: { width: number, height: number }
}

@Injectable()
export class PuppeteerService implements BrowserService {
  private browser: Browser;
  constructor() { }

  async launch() {
    this.browser = await puppeteer
      .use(StealthPlugin())
      .launch({
        headless: 'new',
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
        ],
      });
  }

  async newPage(options: PuppeterPageOptions): Promise<Page> {
    const page = await this.browser.newPage();
    await page.goto(options.url);

    if (options.viewport) {
      await page.setViewport(options.viewport);
    }

    return page;
  }  

  async close() {
    await this.browser.close();
    this.browser = null;
  }

  async scrollPageToBottom(page: IPage) {
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
  }
}