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