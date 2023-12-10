import { Injectable } from "@nestjs/common";
import puppeteer from 'puppeteer-extra';
const StealthPlugin = require('puppeteer-extra-plugin-stealth')


@Injectable()
export class ScrapperService {
    constructor() {}

    async get() {
        const browser = await puppeteer
          .use(StealthPlugin())
          .launch({
            headless: 'new',
            args: [
              '--no-sandbox',
              '--disable-setuid-sandbox',
              ],
          });

        const page = await browser.newPage();
      
        // Navigate the page to a URL
        await page.goto('https://www.coingecko.com/pt/moedas/bitcoin');
      
        // Set screen size
        await page.setViewport({width: 1080, height: 1024});
      
        // Wait for the required DOM to be rendered

        // Screen capture
        await page.screenshot({
          path: 'screenshot.png',
          fullPage: true,
        });
      
        await browser.close();

        return { message: "Scrapper started" }
    }
}