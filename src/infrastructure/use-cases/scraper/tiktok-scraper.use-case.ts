import { BROWSER_SERVICE } from "@constants/browser.constants";
import { BrowserService } from "@interfaces/browser.service.interface";
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class TiktokScraperUseCase {
    private readonly baseUrl = "https://www.tiktok.com";

    constructor(@Inject(BROWSER_SERVICE) private browserService: BrowserService) {}

    async execute(): Promise<any> {
        try {
            await this.browserService.launch();

            const page = await this.browserService.newPage({
                url: this.baseUrl,
                viewport: { width: 1920, height: 1080 },
            });

            await page.screenshot({ path: "./outputs/screenshots/loading.png" });

        } finally {
            await this.browserService.close();
        }
    }
}