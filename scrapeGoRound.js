const puppeteer = require("puppeteer");
const fs = require("fs");
const { exit } = require("process");
let guitars = [];
let links = [];
let listOfPages = [];

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

(async () => {
  const browser = await puppeteer.launch({ headless: true });

  const page = await browser.newPage();
  await page.goto(
    "https://www.musicgoround.com/products/GUEL/electric-guitars?sortBy=xp.Price&page=1"
  );

  await page.waitForNavigation({
    waitUntil: "networkidle0",
  });

  // grabs the max page
  const pages = await page.$$(".page-link");
  for (const tweethandle of pages) {
    // pass the single handle below
    const singleTweet = await page.evaluate((el) => el.innerText, tweethandle);

    listOfPages.push(singleTweet);
  }

  const tweetHandles = await page.$$("product-product-card");

  // list of all guitars on the page
  for (const tweethandle of tweetHandles) {
    // pass the single handle below
    const single = await page.evaluate((el) => el.outerHTML, tweethandle);

    guitars.push(single);
    // console.log(singleTweet);
  }

  // class="d-flex flex-fill text-decoration-none"
  const guitarLinks = await page.$$("a.d-flex.flex-fill.text-decoration-none");

  // grabs the links for guitars listed
  for (const tweethandle of guitarLinks) {
    // pass the single handle below
    const singleTweet = await page.evaluate((el) => el.href, tweethandle);
    links.push(singleTweet);
  }

  console.log("Page 1 of " + listOfPages[listOfPages.length - 2] + " scraped");

  // updates relative link to absolute
  for (i = 0; i < guitars.length; i++) {
    guitars[i] = guitars[i].replace(
      "/product/",
      "https://www.musicgoround.com/product/"
    );
  }

  // outputs first page contents to a file



    fs.appendFile("Output.txt", guitars.toString(), (err) => {
      // In case of a error throw err.
      if (err) throw err;
    });


    exit

  guitars = [];

  // looping through all other pages
  for (i = 2; i <= listOfPages[listOfPages.length - 2]; i++) {
    // await page.setDefaultNavigationTimeout(0);
    let newpage =
      "https://www.musicgoround.com/products/GUEL/electric-guitars?sortBy=xp.Price&page=" +
      i;

    await page.goto(newpage, {
      waitUntil: "networkidle2",
      timeout: 0,
    });

    const cards = await page.$$("product-product-card");

    // list of all guitars on the page
    for (const tweethandle of cards) {
      // pass the single handle below
      const single = await page.evaluate((el) => el.outerHTML, tweethandle);

      guitars.push(single);
      // console.log(singleTweet);
    }

    // class="d-flex flex-fill text-decoration-none"
    const guitarLinkss = await page.$$(
      "a.d-flex.flex-fill.text-decoration-none"
    );

    for (const tweethandle of guitarLinkss) {
      // pass the single handle below
      const singleTweet = await page.evaluate((el) => el.href, tweethandle);

      links.push(singleTweet);
      // do whatever you want with the data
      // console.log(singleTweet);
    }

    console.log(
      "Page " + i + " of " + listOfPages[listOfPages.length - 2] + " scraped"
    );

    for (id = 0; id < guitars.length; id++) {
      guitars[id] = guitars[id].replace(
        "/product/",
        "https://www.musicgoround.com/product/"
      );
    }
    for(guitar in guitars){
    
    fs.appendFile("Output.txt", guitar.toString(), (err) => {
      // In case of a error throw err.
      if (err) throw err;
    });
  }

    guitars = [];
  }

  // console.log(guitars[0]);

  await browser.close();
})();
