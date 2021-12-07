// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec
const fs = require("fs");
let text = fs.readFileSync("./Output.txt").toString('utf-8');
let titleRegEx = /title([\s\S]*?)">/;
let arr = titleRegEx.exec(text);
item = (arr[0].split('"'))[1];
console.log(item);
