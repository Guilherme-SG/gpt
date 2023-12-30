import { BROWSER_SERVICE } from "@constants/browser.constants";
import { BrowserService } from "@interfaces/browser.service.interface";
import { Inject, Injectable } from "@nestjs/common";
import { ElementHandle, Page } from "puppeteer";

@Injectable()
export class KabumScraperUseCase {
    private readonly baseUrl = "https://www.kabum.com.br";
    private readonly PRODUCT_CARD_SELECTOR = "div.productCard";
    private readonly PRODUCT_IMAGE_SELECTOR = "img.imageCard";
    private readonly PRODUCT_RATING_SELECTOR = "div.estrelaAvaliacao";
    private readonly PRODUCT_TOTAL_CARD_SELECTOR = "div.labelTotalAvaliacoes";
    private readonly PRODUCT_DISCOUNT_SELECTOR = "div.discountTagCard";
    private readonly PRODUCT_STOCK_STATUS_SELECTOR = "div.remainingTagCard";
    private readonly PRODUCT_URL_CARD_SELECTOR = "a";
    private readonly PRODUCT_NAME_SELECTOR = "h2";
    private readonly PRODUCT_OLD_PRICE_SELECTOR = "span.oldPriceCard";
    private readonly PRODUCT_CURRENT_PRICE_SELECTOR = "span.priceCard";
    private readonly PRODUCT_LIGHTNING_OFFER_SELECTOR = "div.offerProductFooter";
    private readonly PRODUCT_PRIME_NINJA_SELECTOR = "div.primeLogoTagCard";

    constructor(@Inject(BROWSER_SERVICE) private browserService: BrowserService) {}

    async execute() {
        try {
            await this.browserService.launch();

            const slug = "/hardware/ssd-2-5";

            const page = await this.browserService.newPage({
                url: this.baseUrl + slug,
                viewport: { width: 1920, height: 1080 },
            });

            await page.screenshot({ path: "./outputs/screenshots/loading.png" });

            const productCards = await this.getProductCard(page);

            console.log(`Found ${productCards.length} product cards`)

            return await this.getProductsInfo(productCards)
        } finally {
            await this.browserService.close();
        }
    }

    private async getProductCard(page: Page) {
        console.count("Getting product cards")
        return await page.$$(this.PRODUCT_CARD_SELECTOR);
    }

    private async getProductsInfo(productCards: ElementHandle<HTMLDivElement>[]) {
        return await Promise.all(
            productCards.map( productCard => this.getProductInfo(productCard) )
        );
    }

    private async getProductInfo(productCard: ElementHandle<HTMLDivElement>) {
        return {
            image: await this.getProductImage(productCard),
            rating: await this.getProductRating(productCard),
            totalRatings: await this.tryGetProductTotalRatings(productCard),
            discount: await this.tryGetProductDiscount(productCard),
            stockStatus: await this.tryGetProductStockStatus(productCard),
            url: await this.getProductUrl(productCard),
            name: await this.getProductName(productCard),
            oldPrice: await this.tryGetProductOldPrice(productCard),
            currentPrice: await this.getProductCurrentPrice(productCard),
            endOfLightningOffer: await this.tryGetProductEndOfLightningOffer(productCard),
            hasPrimeNinja: await this.tryHasPrimeNinja(productCard),
        }
    }

    private async getProductImage(productCard: ElementHandle<HTMLDivElement>) {
        console.count("Getting product image")
        return await productCard.$eval(this.PRODUCT_IMAGE_SELECTOR, img => img.src);
    }

    private async getProductRating(productCard: ElementHandle<HTMLDivElement>) {
        console.count("Getting product rating")
        const stars = await productCard.$$(this.PRODUCT_RATING_SELECTOR);
        return stars.length
    }

    private async tryGetProductTotalRatings(productCard: ElementHandle<HTMLDivElement>) {
        try {
            return await this.getProductTotalRatings(productCard)
        } catch (error) {
            console.error("Product total ratings not found")
            return 0
        }
    }

    private async getProductTotalRatings(productCard: ElementHandle<HTMLDivElement>) {
        console.count("Getting product total ratings")
        const totalRatings = await productCard.$eval(this.PRODUCT_TOTAL_CARD_SELECTOR, div => div.innerText.replaceAll(/\D/g, ""))
        return Number(totalRatings)
    }

    private async tryGetProductDiscount(productCard: ElementHandle<HTMLDivElement>) {
        try {
            return await this.getProductDiscount(productCard)
        } catch (error) {
            console.error("Product discount not found")
            return 0
        }
    }

    private async getProductDiscount(productCard: ElementHandle<HTMLDivElement>) {
        console.count("Getting product discount")
        const discount = await productCard.$eval(this.PRODUCT_DISCOUNT_SELECTOR, div => div.innerText.replaceAll(/\D/g, ""))
        return Number(discount) / 100
    }

    private async tryGetProductStockStatus(productCard: ElementHandle<HTMLDivElement>) {
        try {
            return await this.getProductStockStatus(productCard)
        } catch (error) {
            console.error("Product stock status not found")
            return "Sem informações"
        }
    }

    private async getProductStockStatus(productCard: ElementHandle<HTMLDivElement>) {
        console.count("Getting product stock status")
        return await productCard.$eval(this.PRODUCT_STOCK_STATUS_SELECTOR, div => div.innerText.replaceAll("\n", " "))
    }

    private async getProductUrl(productCard: ElementHandle<HTMLDivElement>) {
        console.count("Getting product url")
        return await productCard.$eval(this.PRODUCT_URL_CARD_SELECTOR, a => a.href);
    }

    private async getProductName(productCard: ElementHandle<HTMLDivElement>) {
        console.count("Getting product name")
        return await productCard.$eval(this.PRODUCT_NAME_SELECTOR, h2 => h2.innerText);
    }

    private async tryGetProductOldPrice(productCard: ElementHandle<HTMLDivElement>) {
        try {
            return await this.getProductOldPrice(productCard)
        } catch (error) {
            console.error("Product old price not found")
            return 0
        }
    }

    private async getProductOldPrice(productCard: ElementHandle<HTMLDivElement>) {
        console.count("Getting product old price")
        const priceAsString = await productCard.$eval(this.PRODUCT_OLD_PRICE_SELECTOR, span => span.innerText);
        if (!priceAsString) return 0;

        return this.convertPriceToNumber(priceAsString);
    }

    private async getProductCurrentPrice(productCard: ElementHandle<HTMLDivElement>) {
        console.count("Getting product current price")
        const priceAsString = await productCard.$eval(this.PRODUCT_CURRENT_PRICE_SELECTOR, span => span.innerText);
        if (!priceAsString) return 0;

        return this.convertPriceToNumber(priceAsString);
    }

    private convertPriceToNumber(price: string) {
        console.count("Converting price to number")
        const [integerAsString, decimalAsString] = price.split(",");

        const integer = Number(integerAsString.replaceAll(/\D/g, ""));
        const decimal = Number(decimalAsString) / 100;

        return integer + decimal;
    }

    private async tryGetProductEndOfLightningOffer(productCard: ElementHandle<HTMLDivElement>) {
        try {
            return await this.getProductEndOfLightningOffer(productCard)
        } catch (error) {
            console.error("Product end of lightning offer not found")
            return null
        }
    }

    private async getProductEndOfLightningOffer(productCard: ElementHandle<HTMLDivElement>) {
        console.count("Getting product end of lightning offer")
        const [_, lightningOfferCountDown] = await productCard.$eval(
            this.PRODUCT_LIGHTNING_OFFER_SELECTOR,
            div => div
                .innerText
                .split("\n")
        );

        return this.addTimeToNow(lightningOfferCountDown.replaceAll(" ", ""));
    }

    private addTimeToNow(timeString) {
        if(!timeString) return null;

        let days = 0
        
        if(timeString.includes("D")) {
            const [daysAsString, timeAsString] = timeString.split("D");
            days = Number(daysAsString);
            timeString = timeAsString;
        }

        const now = new Date();

        const [hours, minutes, seconds] = timeString.split(':').map(Number);

        now.setDate(now.getDate() + days);
        now.setHours(now.getHours() + hours);
        now.setMinutes(now.getMinutes() + minutes);
        now.setSeconds(now.getSeconds() + seconds);

        return now;
    }

    private async tryHasPrimeNinja(productCard: ElementHandle<HTMLDivElement>) {
        try {
            return await this.hasPrimeNinja(productCard)
        } catch (error) {
            console.error("Product has prime ninja not found")
            return false
        }
    }

    private async hasPrimeNinja(productCard: ElementHandle<HTMLDivElement>) {
        console.count("Getting product has prime ninja")
        const hasPrimeNinja = await productCard.$(this.PRODUCT_PRIME_NINJA_SELECTOR);
        return !!hasPrimeNinja;
    }
}