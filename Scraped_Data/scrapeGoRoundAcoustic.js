const puppeteer = require("puppeteer");
const fs = require("fs");
const { exit } = require("process");
let guitars = [];
let links = [];
let listOfPages = [];
let allGuitars = [];
let locationDictionary = {};
let allGuitarObjects = [];

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

(async () => {
    const browser = await puppeteer.launch({ headless: true });

    const page = await browser.newPage();
    await page.goto(
        "https://www.musicgoround.com/products/GUAC/acoustic-guitars?sortBy=xp.Price&page=1"
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
        // console.log(single);
    }

    // class="d-flex flex-fill text-decoration-none"
    const guitarLinks = await page.$$("a.d-flex.flex-fill.text-decoration-none");

    // grabs the links for guitars listed
    for (const tweethandle of guitarLinks) {
        // pass the single handle below
        const singleTweet = await page.evaluate((el) => el.href, tweethandle);
        links.push(singleTweet);
        // console.log(singleTweet);
    }
    console.log("Page 1 of " + listOfPages[listOfPages.length - 2] + " scraped");

    // updates relative link to absolute
    for (i = 0; i < guitars.length; i++) {
        guitars[i] = guitars[i].replace(
            "/product/",
            "https://www.musicgoround.com/product/"
        );
    }

    allGuitars = [...guitars];
    for (guitar in guitars) {
        // console.log(guitar)
        allGuitars.push(guitar);

    }





    guitars = [];

    // looping through all other pages
    for (i = 2; i <= listOfPages[listOfPages.length - 2]; i++) {
        // for (i = 2; i <= 3; i++) {
        // await page.setDefaultNavigationTimeout(0);
        let newpage =
            "https://www.musicgoround.com/products/GUAC/acoustic-guitars?sortBy=xp.Price&page=" +
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


        console.log(
            "Page " + i + " of " + listOfPages[listOfPages.length - 2] + " scraped"
        );

        for (id = 0; id < guitars.length; id++) {
            guitars[id] = guitars[id].replace(
                "/product/",
                "https://www.musicgoround.com/product/"

            );
            // console.log(guitars[id]);
        }


        allGuitars.push.apply(allGuitars, guitars);
        // console.log(allGuitars[allGuitars.length - 3])
        // console.log(allGuitars);

        // fs.appendFile("Output.txt", guitars.toString(), (err) => {
        //   // In case of a error throw err.
        //   if (err) throw err;
        // });


        // console.log("test");
        guitars = [];
    }

    // console.log(guitars[0]);

    await browser.close();

    // console.log(allGuitars.length);

    let allGuitarsActual = [];

    for (i = 0; i < allGuitars.length; i++) {
        if (allGuitars[i].length > 50) {
            allGuitarsActual.push(allGuitars[i]);
        }
    }

    // let writer = fs.createWriteStream('output.txt');
    // let locations = fs.createWriteStream('locations.txt');



    for (i = 0; i < allGuitarsActual.length; i++) {
        //   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec
        // https://regex101.com/
        // * Name of item
        // * Price 
        // * Link to page
        // * Link to image
        // * Condition (Used/New)
        // * Location
        // console.log(text);
        // console.log(i)

        let text = allGuitarsActual[i];
        let item = [];
        // Grabs name of the item
        let itemRegEx = /title([\s\S]*?)">/;
        let arr = itemRegEx.exec(text);
        let nameItem = (arr[0].split('"'))[1];
        // console.log(nameItem);

        // Grabs price of item
        let priceRegEx = /-0">([\s\S]*?)<\/p><!/g;
        arr = priceRegEx.exec(text);
        let namePrice = "";


        if (arr == null) {
            priceRegEx = /discounted-price">([\s\S]*?)<\/p><!/g;
            arr = priceRegEx.exec(text);
            namePrice = arr[0].split(' ')[1]
        } else {
            namePrice = (arr[0].split(' '))[1];
        }





        // Grabs link to page
        let pageRegEx = /="https:\/\/www.musicgoround.com\/product\/([\s\S]*?)">/g;
        arr = pageRegEx.exec(text);
        let nameLink = (arr[0].split('='))[1];
        nameLink = (arr[0].split('"'))[1];

        let imageRegEx = /src="([\s\S]*?)">/g;
        arr = imageRegEx.exec(text);
        let nameImage = (arr[0].split('='))[1];
        nameImage = (arr[0].split('"'))[1];

        // Grabs location of the item
        let locationRegEx = /n><small>([\s\S]*?)<\//g;
        arr = locationRegEx.exec(text);
        let nameLocation = arr[1];
        locationDictionary[nameLocation] = nameLocation;



        item.push(nameItem, namePrice, nameLocation, nameLink, nameImage);

        let guitar = { name: nameItem, price: namePrice, link: nameLink, location: nameLocation, img: nameImage };
        allGuitarObjects.push(guitar);



        item = [];

    }

    // for (let key in locationDictionary) locations.write(locationDictionary[key] + "\n");
    let guitarData = JSON.stringify(allGuitarObjects);

    try {
        fs.unlinkSync("./Acousticguitars.json");
    } catch (err) {
        console.error(err)
    }

    fs.appendFile("Acousticguitars.json", guitarData, (err) => {
        // In case of a error throw err.
        if (err) throw err;
    });

    let locationData = JSON.stringify(locationDictionary);
    fs.appendFile("locations.json", locationData, (err) => {
        // In case of a error throw err.
        if (err) throw err;
    });


})();





