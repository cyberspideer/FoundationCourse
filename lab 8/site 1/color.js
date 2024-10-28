const colors = ["green", "red", "rgba(133,122,200)", "#f15025"];

const btn = document.querySelector (".btn1")
const colorPanel = document.querySelector("#colorPanel")
const body = document.querySelector("body")

btn.addEventListener ('click', ChangeColor)

function ChangeColor (){
    console.log("hello");
    let index = Math.floor (colors.length * Math.random())
    console.log (index, colors [index])
    colorPanel.style.backgroundColor = colors [index]
    colorCode.innerHTML = colors [index];


    // body.style.backgroundColor = "blue"
}

