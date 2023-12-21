import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { ScraperService } from "@services/scraper/scraper.service";

@Injectable()
export class AmazonScraperUseCase {
    private readonly baseUrl = "https://www.amazon.com.br";
    private readonly DEPARTMENT_XPATH = "/html/body/div[1]/div[1]/div[2]/div/div/div/div[2]/div/div[2]/div/div/div[2]";
    private readonly DEPARTAMENT_SELECTOR = "a";
    private readonly ITEM_SHIPPING_SELECTOR = "span._1BSEX._3dc7w._1Z6Rx";
    private readonly ITEM_CURRENT_PRICE_SELECTOR = "div.U-S0j";
    private readonly ITEM_ORIGINAL_PRICE_SELECTOR = "div._1zEQq";

    private readonly REQUEST_THROTTLE_MESSAGE = "Request was throttled. Please wait a moment and refresh the page";

    constructor(private readonly scraperService: ScraperService) { }

    async execute() {
        try {
            await this.scraperService.launch();

            const slug = "/gp/bestsellers/ref=zg_bsms_tab_bs";

            const page = await this.scraperService.newPage({
                url: this.baseUrl + slug,
                viewport: { width: 1920, height: 1080 },
            });

            await page.screenshot({ path: "./outputs/screenshots/loading.png" });

            const requestWasThrottle = this.checkIfRequestWasThrottle(page);

            if(requestWasThrottle) throw new InternalServerErrorException(this.REQUEST_THROTTLE_MESSAGE);

            await page.waitForXPath(this.DEPARTMENT_XPATH);
                
            await page.screenshot({ path: "./outputs/screenshots/loaded.png" });

            return await this.getDepartments(page);
        } finally {
            await this.scraperService.close();
        }
    }

    private async checkIfRequestWasThrottle(page) {
        return await page.evaluate(
            REQUEST_THROTTLE_MESSAGE => document.body.innerText.includes(REQUEST_THROTTLE_MESSAGE),
            this.REQUEST_THROTTLE_MESSAGE
        );
    }

    private async getDepartments(page) {
        const [deparatamentList] = await page.$x(this.DEPARTMENT_XPATH);
        const departments = await deparatamentList.$$eval(this.DEPARTAMENT_SELECTOR, (divs) =>
            divs.map((div) => ({
                href: div.getAttribute("href"),
                title: div.querySelector("span")?.innerText,
            }))
        );

        return departments;
    }
}