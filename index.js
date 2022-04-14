
// import $ from 'jquery'  //
// import 'bootstrap'  // bootstrap css  import 'bootstrap/dist/css/bootstrap.css'
let guitars;
let container = document.getElementById("main_container");
const ps = document.querySelectorAll('body')

fetch("ScrapedData/guitars.json")
    .then(response => response.json())
    .then(data => {
        data.forEach(function (guitar) {
            const div = document.createElement('div')
            div.textContent = guitar.price + " " + guitar.name
            div.classList.add("card")
            // const img = document.createElement('div')
            // img.classList.add("card-img-top")
            // img.src = guitar.img
            document.querySelector('body').appendChild(div)
            // document.querySelector('#card').appendChild(img)
        })
    })