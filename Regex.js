// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec
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
nameItem = (arr[0].split(' '))[1]; 
console.log(nameItem);

// Grabs link to page
let pageRegEx = /-0">([\s\S]*?)<\/p><!/g;
arr = pageRegEx.exec(text);
nameItem = (arr[0].split(' '))[1]; 
console.log(nameItem);