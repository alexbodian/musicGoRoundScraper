const puppeteer = require("puppeteer");
const fs = require("fs");
const { exit } = require("process");
let guitars = [];
let links = [];
let listOfPages = [];
let allGuitars = [];

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

  console.log(guitars)


    fs.appendFile("Output.txt", guitars.toString(), (err) => {
      // In case of a error throw err.
      if (err) throw err;
    });

    for (guitar in guitars){
      allGuitars.push(guitar);

    }


  guitars = [];

  // looping through all other pages
  // for (i = 2; i <= listOfPages[listOfPages.length - 2]; i++)
  for (i = 2; i < i; i++) {
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
      allGuitars.push(guitar);  
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


for (text in allGuitars){
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec
// https://regex101.com/
// * Name of item
// * Price 
// * Link to page
// * Link to image
// * Condition (Used/New)
// * Location

const fs = require("fs");
let text = fs.readFileSync("./Output.txt").toString('utf-8');

// Grabs name of the item
let itemRegEx = /title([\s\S]*?)">/;
let arr = itemRegEx.exec(text);
nameItem = (arr[0].split('"'))[1]; 
console.log(nameItem);

// Grabs price of item
let priceRegEx = /-0">([\s\S]*?)<\/p><!/g;
arr = priceRegEx.exec(text);
namePrice = (arr[0].split(' '))[1]; 
console.log(namePrice);

// Grabs link to page
let pageRegEx = /="https:\/\/www.musicgoround.com\/product\/([\s\S]*?)">/g;
arr = pageRegEx.exec(text);
nameLink = (arr[0].split('='))[1]; 
nameLink = (arr[0].split('"'))[1]; 
console.log(nameLink);

// Grabs condition of the item
let conditionRegEx = /<small>([\s\S]*?)<\/small><!/g;
arr = conditionRegEx.exec(text);
nameCondition = arr[1];
console.log(nameCondition);

// Grabs location of the item
let locationRegEx = /n><small>([\s\S]*?)<\//g;
arr = locationRegEx.exec(text);
nameLocation = arr[1];
console.log(nameLocation);
}



