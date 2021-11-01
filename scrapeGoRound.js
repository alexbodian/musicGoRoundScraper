const puppeteer = require("puppeteer");
const fs = require("fs");
// const List = require("collections/list");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(
    "https://www.musicgoround.com/products/GUEL/electric-guitars?sortBy=xp.Price&page=1"
  );

  await page.waitForNavigation({
    waitUntil: "networkidle0",
  });

  await page.screenshot({ path: "example.png" });

  // const elems = await page.$$(".card");

  // let guitars;

  const tweets = await page.$$eval(
    ".card.w-100.border-hover.align-items-stretch.cursor-pointer",
    (element) => element.innerHTML
  );

  // let's just call them tweetHandle

  const tweetHandles = await page.$$(
    ".card.w-100.border-hover.align-items-stretch.cursor-pointer"
  );

  let guitars = [];

  // list of all guitars on the page
  for (const tweethandle of tweetHandles) {
    // pass the single handle below
    const singleTweet = await page.evaluate((el) => el.innerHTML, tweethandle);

    guitars.push(singleTweet);
    // do whatever you want with the data
    console.log(singleTweet);
  }

  // class="d-flex flex-fill text-decoration-none"
  const guitarLinks = await page.$$(".d-flex.flex-fill.text-decoration-none");

  for (const tweethandle of guitarLinks) {
    // pass the single handle below
    const singleTweet = await page.evaluate((el) => el.innerHTML, tweethandle);

    guitars.push(singleTweet);
    // do whatever you want with the data
    console.log(singleTweet);
  }

  // console.log(guitars\);

  fs.writeFile("Output.txt", guitars, (err) => {
    // In case of a error throw err.
    if (err) throw err;
  });

  await browser.close();
})();
