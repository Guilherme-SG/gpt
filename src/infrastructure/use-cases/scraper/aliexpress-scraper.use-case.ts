import { Injectable } from "@nestjs/common";
import { ScraperService } from "@services/scraper/scraper.service";

@Injectable()
export class AliexpressScraperUseCase {
    private readonly LIST_SELECTOR_XPATH = "/html/body/div[6]/div/div/div[3]/div[2]/div";
    private readonly ITEM_SELECTOR = "div > div > a";
    private readonly ITEM_SHIPPING_SELECTOR = "span._1BSEX._3dc7w._1Z6Rx";
    private readonly ITEM_CURRENT_PRICE_SELECTOR = "div.U-S0j";
    private readonly ITEM_ORIGINAL_PRICE_SELECTOR = "div._1zEQq";

    constructor(private readonly scraperService: ScraperService) { }

    async execute() {
        try {
            await this.scraperService.launch();

            const page = await this.scraperService.newPage({
                url: "https://www.aliexpress.com/p/calp-plus/index.html?spm=a2g0o.categorymp.allcategoriespc.17.f6e0z41Iz41IWz&categoryTab=computer%252C_office_%2526_education",
                viewport: { width: 1920, height: 1080 },
            });

            await page
                .waitForXPath(this.LIST_SELECTOR_XPATH)
                
            await page.screenshot({ path: "./outputs/screenshots/example.png" });

            const productList = []

            for(let i = 0; i < 10; i++) {
            await this.scraperService.scrollPageToBottom(page);

                const [list] = await page.$x(this.LIST_SELECTOR_XPATH);
                console.log("$$eval")
                const products = await list.$$eval(this.ITEM_SELECTOR, (divs) =>
                    divs.map( div => ({
                        img: div.querySelector("img")?.src,
                        title: div.querySelector("h1")?.innerText,
                        sells: div.querySelector("span")?.innerText,
                        shipping: div.querySelector(this.ITEM_SHIPPING_SELECTOR)?.innerHTML,
                        currentPrice: div.querySelector(this.ITEM_CURRENT_PRICE_SELECTOR)?.innerHTML.substring(2).replace(",", "."),
                        originalPrice: div.querySelector(this.ITEM_ORIGINAL_PRICE_SELECTOR)?.innerHTML.substring(2).replace(",", "."),
                    }))
                );
                console.log(products);

                productList.push(...products)
                await page.screenshot({ path: `./outputs/screenshots/example-${i}.png` });
            }
            



            return productList;
        } finally {
            await this.scraperService.close();
        }
    }
}

`
<div class="_2FypS" style="max-width: 16.6667%; padding-left: 8px; padding-right: 8px; flex-basis: 16.6667%;"><div class="SeJ8l card--out-wrapper" style=""><a class="_1UZxx" href="//pt.aliexpress.com/item/1005005598781533.html?pdp_ext_f=%7B%22sku_id%22%3A%2212000033706120401%22%7D" target="_blank"><div class="_2bIiW _2xJR2" style=""><img class="_1IH3l product-img" src="//ae01.alicdn.com/kf/Sf82333016e504eb9ad0dc0d9fa0f68899/Mini-Photo-Pocket-Printer-Portable-Ink-free-Thermal-57mm-Sticker-Trans-Paper-Wireless-BT-200dpi-Android.jpg_220x220xz.jpg_.webp" alt="Mini Impressora Portátil de Bolso Fotográfico, Sem Tinta, Térmica, Adesivo de 57mm, Papel Trans, Sem Fio, BT, 200dpi, Android, IOS, Máquina de Impressão" aria-hidden="true"><div class="_8Ut19"></div><div class="darm7 _1kiOX"><svg width="23px" height="21px" viewBox="0 0 23 21" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="0808-商卡" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="BTN/加购" transform="translate(-13.000000, -14.000000)" fill-rule="nonzero"><g id="ICON-购物车" transform="translate(12.000000, 12.000000)"><rect id="矩形" fill="#000000" opacity="0" x="0" y="0" width="24" height="24"></rect><path d="M7.0774212,18.9926395 C8.08766056,18.9926395 8.90662138,19.8116004 8.90662138,20.8218397 C8.90662138,21.8320791 8.08766056,22.6510399 7.0774212,22.6510399 C6.06718183,22.6510399 5.24822102,21.8320791 5.24822102,20.8218397 C5.24822102,19.8116004 6.06718183,18.9926395 7.0774212,18.9926395 Z M18.0726417,18.9926395 C19.082881,18.9926395 19.9018419,19.8116004 19.9018419,20.8218397 C19.9018419,21.8320791 19.082881,22.6510399 18.0726417,22.6510399 C17.0624023,22.6510399 16.2434415,21.8320791 16.2434415,20.8218397 C16.2434415,19.8116004 17.0624023,18.9926395 18.0726417,18.9926395 Z M1.17443267,2.49165197 C1.49906021,1.99148218 2.16773114,1.8495568 2.66767719,2.17451017 C3.64733797,2.81110008 4.3148453,3.82968869 4.50990294,4.9990376 L5.58968896,14.4573156 C5.65712883,15.0480484 6.15706794,15.4941603 6.75163783,15.4941603 L18.4694998,15.4941603 C19.0426792,15.4941603 19.5313891,15.0787511 19.6237222,14.5130576 L21.0652746,5.68116489 C21.1556925,5.12720531 21.6680507,4.74396606 22.2249912,4.81370734 C22.7263385,4.87648711 23.1001491,5.30310927 23.0992012,5.82942993 L23.0886183,5.95611179 L21.6982271,15.0573509 C21.4655833,16.5223425 20.2213553,17.6131451 18.7344285,17.6521812 L18.6576374,17.6532141 L6.54340335,17.6532141 C5.01073757,17.6532141 3.71149494,16.5257607 3.49485093,15.0033518 L3.48515488,14.9266622 L2.39237826,5.43927195 C2.32653231,4.86738366 2.01850839,4.3512228 1.55178243,4.02538491 L1.49121273,3.98481305 C0.991439345,3.65984946 0.849674211,2.99129799 1.17443267,2.49165197 Z M12.8245656,2.42485311 C13.380613,2.42485311 13.8456887,2.84726083 13.9002042,3.4163949 L13.9040917,3.50437917 L13.9038771,6.42252957 L16.8229909,6.42311514 C17.3628324,6.42338244 17.8133858,6.82083771 17.8903976,7.34444043 L17.9007352,7.45076264 C17.9284077,8.02592825 17.4997692,8.52156459 16.9108119,8.5782797 L16.8228276,8.58216722 L13.9038771,8.5814105 L13.9040917,11.5010665 C13.9038244,12.0409079 13.5063691,12.4914613 12.9827664,12.5684731 L12.8764442,12.5788107 C12.3012786,12.6064833 11.8056422,12.1778448 11.7489271,11.5888874 L11.7450396,11.5009031 L11.7449961,8.5814105 L8.82614033,8.58216718 C8.28629891,8.58189989 7.83574552,8.18444461 7.75873365,7.66084189 L7.74839606,7.55451968 C7.72072354,6.97935407 8.14936205,6.48371773 8.73831938,6.42700262 L8.82630365,6.4231151 L11.7449961,6.42252957 L11.7450396,3.50437917 C11.7450396,2.94543625 12.1698328,2.48570911 12.7141904,2.43042658 L12.8245656,2.42485311 Z" id="形状结合" fill="currentColor"></path></g></g></g></svg></div></div><div class="_11nFI"><div title="Mini Impressora Portátil de Bolso Fotográfico, Sem Tinta, Térmica, Adesivo de 57mm, Papel Trans, Sem Fio, BT, 200dpi, Android, IOS, Máquina de Impressão" style="margin-top: 8px;" class="G7dOC"><h1 class="nXeOv">Mini Impressora Portátil de Bolso Fotográfico, Sem Tinta, Térmica, Adesivo de 57mm, Papel Trans, Sem Fio, BT, 200dpi, Android, IOS, Máquina de Impressão </h1></div><div class="_3TqP9"><div class="t9_CA"><div class="Ktfxu"><div class="_2E4Wz" dir="ltr" style="width: 10px;"></div><img class="EYoOU" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAeCAYAAAE6DSy/AAAABGdBTUEAALGPC/xhBQAAAGxlWElmTU0AKgAAAAgABAEaAAUAAAABAAAAPgEbAAUAAAABAAAARgEoAAMAAAABAAIAAIdpAAQAAAABAAAATgAAAAAAAACQAAAAAQAAAJAAAAABAAKgAgAEAAAAAQAAACCgAwAEAAAAAQAAAB4AAAAA2L2NEgAAAAlwSFlzAAAWJQAAFiUBSVIk8AAAArdJREFUSA2tl81qFFEQhSeJEDEYQYT4g+DCEFwoPoQbA7pwl1UIeQ5fIA/gIyQEJDggKG7VbESEIEQ0hmyjO0FBicTvdN+6Vt++PdOdTkFN1a0659Ttnv6ZGRz/t6tKB2F9OMBiQQuzSUssThQwWyn6gnJRLjjAmxrCxgotWzGZclnu67qTqKcRWW8V6pV9G5j4PuJdUelGsj6uHOgEJqZApuBHPLQicdvlY1Ivl0LVK0YQ13LNotakQH1XvbhJ8kUVZEHtSVQoy/VPG0tntd4tK+mXGXFGtkhjOTZdIoFNA3WNcM/aDqa7koVHYGgCtqm5NkKAd4wQz3IgXmkjAOZ2xJmSYiyGhNIS/hmvDGL9GC8sPQSrW7xG8tIWuThKYNV2lCNarVHAyIqAV4yQxiaBZS8QRFJusc4JvE3JQeABjMNURQKXcoQ2NbgbbXCNGARuaQfDRsSIBrxpPD7RX4/A1lrwZkWW+ZO4U0NmCnDmCmb48AK1SznDF36tr8DdJoHd3MRczQv4u2zdgwFN4roTl3w9zb3AX2tC0ttH63l8nbVs0fo+Vl4+vjEmP6C/wLvqj3CI65H4Cb+BdzJ/BG2J+wDnbbhI5L9Vw9XrZF038BV1HflROiXUFqgL09q6bOALqtnhNs1tQthWZtfAL9AfcBH3XNxD9AfrExvXxyzkm8H1NSlXvIOf1wXU9k0G/nStmM3HED9zutLj1TQTf+GfZa8onBtP7YfQDFyzCvMbsNo7kov9xtTZ0sSlXbHcBgxw4h9t6XgEN000jaNuw+epUI91o5bdhqm2nuMz3IJ6wvU2jlqP6p/4VCrWdAa22gxHeEqeiqbroLWV1rVu2sCzHJhhOmOP8I+4fgHokXykHFNNveLfVIb/NFMr/3aJndg31vfwGfw+vo13NXH0Y/AyLq3veM3+AXQngyvegYcWAAAAAElFTkSuQmCC" width="10" height="10" alt=""></div><div class="Ktfxu"><div class="_2E4Wz" dir="ltr" style="width: 10px;"></div><img class="EYoOU" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAeCAYAAAE6DSy/AAAABGdBTUEAALGPC/xhBQAAAGxlWElmTU0AKgAAAAgABAEaAAUAAAABAAAAPgEbAAUAAAABAAAARgEoAAMAAAABAAIAAIdpAAQAAAABAAAATgAAAAAAAACQAAAAAQAAAJAAAAABAAKgAgAEAAAAAQAAACCgAwAEAAAAAQAAAB4AAAAA2L2NEgAAAAlwSFlzAAAWJQAAFiUBSVIk8AAAArdJREFUSA2tl81qFFEQhSeJEDEYQYT4g+DCEFwoPoQbA7pwl1UIeQ5fIA/gIyQEJDggKG7VbESEIEQ0hmyjO0FBicTvdN+6Vt++PdOdTkFN1a0659Ttnv6ZGRz/t6tKB2F9OMBiQQuzSUssThQwWyn6gnJRLjjAmxrCxgotWzGZclnu67qTqKcRWW8V6pV9G5j4PuJdUelGsj6uHOgEJqZApuBHPLQicdvlY1Ivl0LVK0YQ13LNotakQH1XvbhJ8kUVZEHtSVQoy/VPG0tntd4tK+mXGXFGtkhjOTZdIoFNA3WNcM/aDqa7koVHYGgCtqm5NkKAd4wQz3IgXmkjAOZ2xJmSYiyGhNIS/hmvDGL9GC8sPQSrW7xG8tIWuThKYNV2lCNarVHAyIqAV4yQxiaBZS8QRFJusc4JvE3JQeABjMNURQKXcoQ2NbgbbXCNGARuaQfDRsSIBrxpPD7RX4/A1lrwZkWW+ZO4U0NmCnDmCmb48AK1SznDF36tr8DdJoHd3MRczQv4u2zdgwFN4roTl3w9zb3AX2tC0ttH63l8nbVs0fo+Vl4+vjEmP6C/wLvqj3CI65H4Cb+BdzJ/BG2J+wDnbbhI5L9Vw9XrZF038BV1HflROiXUFqgL09q6bOALqtnhNs1tQthWZtfAL9AfcBH3XNxD9AfrExvXxyzkm8H1NSlXvIOf1wXU9k0G/nStmM3HED9zutLj1TQTf+GfZa8onBtP7YfQDFyzCvMbsNo7kov9xtTZ0sSlXbHcBgxw4h9t6XgEN000jaNuw+epUI91o5bdhqm2nuMz3IJ6wvU2jlqP6p/4VCrWdAa22gxHeEqeiqbroLWV1rVu2sCzHJhhOmOP8I+4fgHokXykHFNNveLfVIb/NFMr/3aJndg31vfwGfw+vo13NXH0Y/AyLq3veM3+AXQngyvegYcWAAAAAElFTkSuQmCC" width="10" height="10" alt=""></div><div class="Ktfxu"><div class="_2E4Wz" dir="ltr" style="width: 10px;"></div><img class="EYoOU" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAeCAYAAAE6DSy/AAAABGdBTUEAALGPC/xhBQAAAGxlWElmTU0AKgAAAAgABAEaAAUAAAABAAAAPgEbAAUAAAABAAAARgEoAAMAAAABAAIAAIdpAAQAAAABAAAATgAAAAAAAACQAAAAAQAAAJAAAAABAAKgAgAEAAAAAQAAACCgAwAEAAAAAQAAAB4AAAAA2L2NEgAAAAlwSFlzAAAWJQAAFiUBSVIk8AAAArdJREFUSA2tl81qFFEQhSeJEDEYQYT4g+DCEFwoPoQbA7pwl1UIeQ5fIA/gIyQEJDggKG7VbESEIEQ0hmyjO0FBicTvdN+6Vt++PdOdTkFN1a0659Ttnv6ZGRz/t6tKB2F9OMBiQQuzSUssThQwWyn6gnJRLjjAmxrCxgotWzGZclnu67qTqKcRWW8V6pV9G5j4PuJdUelGsj6uHOgEJqZApuBHPLQicdvlY1Ivl0LVK0YQ13LNotakQH1XvbhJ8kUVZEHtSVQoy/VPG0tntd4tK+mXGXFGtkhjOTZdIoFNA3WNcM/aDqa7koVHYGgCtqm5NkKAd4wQz3IgXmkjAOZ2xJmSYiyGhNIS/hmvDGL9GC8sPQSrW7xG8tIWuThKYNV2lCNarVHAyIqAV4yQxiaBZS8QRFJusc4JvE3JQeABjMNURQKXcoQ2NbgbbXCNGARuaQfDRsSIBrxpPD7RX4/A1lrwZkWW+ZO4U0NmCnDmCmb48AK1SznDF36tr8DdJoHd3MRczQv4u2zdgwFN4roTl3w9zb3AX2tC0ttH63l8nbVs0fo+Vl4+vjEmP6C/wLvqj3CI65H4Cb+BdzJ/BG2J+wDnbbhI5L9Vw9XrZF038BV1HflROiXUFqgL09q6bOALqtnhNs1tQthWZtfAL9AfcBH3XNxD9AfrExvXxyzkm8H1NSlXvIOf1wXU9k0G/nStmM3HED9zutLj1TQTf+GfZa8onBtP7YfQDFyzCvMbsNo7kov9xtTZ0sSlXbHcBgxw4h9t6XgEN000jaNuw+epUI91o5bdhqm2nuMz3IJ6wvU2jlqP6p/4VCrWdAa22gxHeEqeiqbroLWV1rVu2sCzHJhhOmOP8I+4fgHokXykHFNNveLfVIb/NFMr/3aJndg31vfwGfw+vo13NXH0Y/AyLq3veM3+AXQngyvegYcWAAAAAElFTkSuQmCC" width="10" height="10" alt=""></div><div class="Ktfxu"><div class="_2E4Wz" dir="ltr" style="width: 10px;"></div><img class="EYoOU" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAeCAYAAAE6DSy/AAAABGdBTUEAALGPC/xhBQAAAGxlWElmTU0AKgAAAAgABAEaAAUAAAABAAAAPgEbAAUAAAABAAAARgEoAAMAAAABAAIAAIdpAAQAAAABAAAATgAAAAAAAACQAAAAAQAAAJAAAAABAAKgAgAEAAAAAQAAACCgAwAEAAAAAQAAAB4AAAAA2L2NEgAAAAlwSFlzAAAWJQAAFiUBSVIk8AAAArdJREFUSA2tl81qFFEQhSeJEDEYQYT4g+DCEFwoPoQbA7pwl1UIeQ5fIA/gIyQEJDggKG7VbESEIEQ0hmyjO0FBicTvdN+6Vt++PdOdTkFN1a0659Ttnv6ZGRz/t6tKB2F9OMBiQQuzSUssThQwWyn6gnJRLjjAmxrCxgotWzGZclnu67qTqKcRWW8V6pV9G5j4PuJdUelGsj6uHOgEJqZApuBHPLQicdvlY1Ivl0LVK0YQ13LNotakQH1XvbhJ8kUVZEHtSVQoy/VPG0tntd4tK+mXGXFGtkhjOTZdIoFNA3WNcM/aDqa7koVHYGgCtqm5NkKAd4wQz3IgXmkjAOZ2xJmSYiyGhNIS/hmvDGL9GC8sPQSrW7xG8tIWuThKYNV2lCNarVHAyIqAV4yQxiaBZS8QRFJusc4JvE3JQeABjMNURQKXcoQ2NbgbbXCNGARuaQfDRsSIBrxpPD7RX4/A1lrwZkWW+ZO4U0NmCnDmCmb48AK1SznDF36tr8DdJoHd3MRczQv4u2zdgwFN4roTl3w9zb3AX2tC0ttH63l8nbVs0fo+Vl4+vjEmP6C/wLvqj3CI65H4Cb+BdzJ/BG2J+wDnbbhI5L9Vw9XrZF038BV1HflROiXUFqgL09q6bOALqtnhNs1tQthWZtfAL9AfcBH3XNxD9AfrExvXxyzkm8H1NSlXvIOf1wXU9k0G/nStmM3HED9zutLj1TQTf+GfZa8onBtP7YfQDFyzCvMbsNo7kov9xtTZ0sSlXbHcBgxw4h9t6XgEN000jaNuw+epUI91o5bdhqm2nuMz3IJ6wvU2jlqP6p/4VCrWdAa22gxHeEqeiqbroLWV1rVu2sCzHJhhOmOP8I+4fgHokXykHFNNveLfVIb/NFMr/3aJndg31vfwGfw+vo13NXH0Y/AyLq3veM3+AXQngyvegYcWAAAAAElFTkSuQmCC" width="10" height="10" alt=""></div><div class="Ktfxu"><div class="_2E4Wz" dir="ltr" style="width: 7px;"></div><img class="EYoOU" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAeCAYAAAE6DSy/AAAABGdBTUEAALGPC/xhBQAAAGxlWElmTU0AKgAAAAgABAEaAAUAAAABAAAAPgEbAAUAAAABAAAARgEoAAMAAAABAAIAAIdpAAQAAAABAAAATgAAAAAAAACQAAAAAQAAAJAAAAABAAKgAgAEAAAAAQAAACCgAwAEAAAAAQAAAB4AAAAA2L2NEgAAAAlwSFlzAAAWJQAAFiUBSVIk8AAAArdJREFUSA2tl81qFFEQhSeJEDEYQYT4g+DCEFwoPoQbA7pwl1UIeQ5fIA/gIyQEJDggKG7VbESEIEQ0hmyjO0FBicTvdN+6Vt++PdOdTkFN1a0659Ttnv6ZGRz/t6tKB2F9OMBiQQuzSUssThQwWyn6gnJRLjjAmxrCxgotWzGZclnu67qTqKcRWW8V6pV9G5j4PuJdUelGsj6uHOgEJqZApuBHPLQicdvlY1Ivl0LVK0YQ13LNotakQH1XvbhJ8kUVZEHtSVQoy/VPG0tntd4tK+mXGXFGtkhjOTZdIoFNA3WNcM/aDqa7koVHYGgCtqm5NkKAd4wQz3IgXmkjAOZ2xJmSYiyGhNIS/hmvDGL9GC8sPQSrW7xG8tIWuThKYNV2lCNarVHAyIqAV4yQxiaBZS8QRFJusc4JvE3JQeABjMNURQKXcoQ2NbgbbXCNGARuaQfDRsSIBrxpPD7RX4/A1lrwZkWW+ZO4U0NmCnDmCmb48AK1SznDF36tr8DdJoHd3MRczQv4u2zdgwFN4roTl3w9zb3AX2tC0ttH63l8nbVs0fo+Vl4+vjEmP6C/wLvqj3CI65H4Cb+BdzJ/BG2J+wDnbbhI5L9Vw9XrZF038BV1HflROiXUFqgL09q6bOALqtnhNs1tQthWZtfAL9AfcBH3XNxD9AfrExvXxyzkm8H1NSlXvIOf1wXU9k0G/nStmM3HED9zutLj1TQTf+GfZa8onBtP7YfQDFyzCvMbsNo7kov9xtTZ0sSlXbHcBgxw4h9t6XgEN000jaNuw+epUI91o5bdhqm2nuMz3IJ6wvU2jlqP6p/4VCrWdAa22gxHeEqeiqbroLWV1rVu2sCzHJhhOmOP8I+4fgHokXykHFNNveLfVIb/NFMr/3aJndg31vfwGfw+vo13NXH0Y/AyLq3veM3+AXQngyvegYcWAAAAAElFTkSuQmCC" width="10" height="10" alt=""></div></div><span class="Ktbl2">5,000+  vendido(s)</span></div><div class="_1okBC"><div class="U-S0j"><span style="font-size: 12px;">R$</span><span style="font-size: 24px;">95</span><span style="font-size: 12px;">,</span><span style="font-size: 12px;">87</span></div><div class="_1zEQq"><span style="text-decoration: line-through; color: rgb(153, 153, 153);">R$241,93</span></div></div><div class="T8SnT"><img aria-hidden="true" dir="" class="_1lYat _1jUmO" src="https://ae01.alicdn.com/kf/Sfe0e0fe49f904fb1a724c42b1bfda403v/354x64.png" height="16" width="88.5"><span class="_1juYg"></span><span class="_1BSEX _3dc7w _1jUmO" title="2% off extra com moedas" style="color: rgb(253, 56, 79);">2% off extra com moedas</span><span class="_1juYg"></span><span class="_3hksz" title="-60%">-60%</span></div><div class="_3vRdz"><img aria-hidden="true" dir="" class="_1lYat" src="https://ae01.alicdn.com/kf/S051e42ccb51347c58a6083a38aa7bcffP/190x64.png" height="16" width="47.5"><span class="_1BSEX _3dc7w _1Z6Rx" title="Frete grátis acima de R$99" style="color: rgb(25, 25, 25);">Frete grátis acima de R$99</span></div></div><div class="eFkEW rcmd-hover-more-action"><div style="width: 100%;" class="_3W0hl"><span title="Pré-visualizar" class="_3bWs9">Pré-visualizar</span></div></div></a></div></div>
`