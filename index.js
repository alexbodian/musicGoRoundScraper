import JSON from "./guitars.json" assert {type:
    "json"};
let container = document.getElementById("main_container");
let content = ""

// {
//     "name": "Used No Brand Electric Guitar Blue BODY",
//     "price": "$19.99",
//     "link": "https://www.musicgoround.com/product/41117-S000025872/used-no-brand-electric-guitar-blue-body",
//     "location": "Elk Grove, CA",
//     "img": "https://musicgoround.imgix.net/images/41117-S000025872-2?auto=compress,format&amp;fit=clip&amp;w=350"
// },

for (let i = 0; i <= JSON.length; i++){
    
    console.log(JSON[i]);
    
    content += '<div class="card" style="width: 18rem;"> <img src=';
    content +=  JSON[i].img;
    content += ' class="card-img-top" alt="..."> <div class="card-body"> <h5 class="card-title">Card title</h5>';
    // '<p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>''<a href="#" class="btn btn-primary">Go somewhere</a>';
}



// https://stackoverflow.com/questions/56413874/generating-dynamic-cards-html-cards-from-a-javascript-array-and-bootstrap-in-dif