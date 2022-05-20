const puppeteer = require("puppeteer");
const { exit } = require("process");


(async () => {
    const browser = await puppeteer.launch({ headless: true });

    /**
     * In Store only example
     * https://www.musicgoround.com/product/40042-S000199487/used-peavey-112dl-single-passive-speaker
     * 
     * Shipping
     * https://www.musicgoround.com/product/40012-S000254987/used-xaviere-tele-style-electric-guitars-red
     * https://www.musicgoround.com/product/41103-S000039613/used-mckerrihan-anastasia-solo-custom-electric-guitar-cherry-sunburst
     * 
     * 
     */


    const page = await browser.newPage();
    await page.goto(
        "https://www.musicgoround.com/product/41103-S000039613/used-mckerrihan-anastasia-solo-custom-electric-guitar-cherry-sunburst"
    );

    await page.waitForNavigation({
        waitUntil: "networkidle0",
    });

    const elements = await page.$$("p");
    let count = 0;

    let shippingCost = 0;
    let shippable = false;
    for (const element of elements) {
        // pass the single handle below
        const single = await page.evaluate((el) => el.outerHTML, element);
        // console.log(single)
        if (single.includes("Shipping")) {
            console.log(count);
            console.log(single);
            let regex = /class="text-muted">+ ([\s\S]*?) S/g;
            console.log("match")
            let arr = regex.exec(single);
            console.log(arr)
            shippable = true;
        } else {
            break;
        }
    }




})();





