const colors = ["green", "red", "rgba(133,122,200)", "#f15025"];

const btn = document.querySelector (".btn1")
const colorPanel = document.querySelector("#colorPanel")
const colorCode = document.querySelector("#colorCode");
const body = document.querySelector("body")

const btn2 = document.querySelector (".btn2")
btn.addEventListener ('click', ChangeColor)


function ChangeColor (){
    console.log("hello");
    let index = Math.floor (colors.length * Math.random())
    console.log (index, colors [index])
    colorPanel.style.backgroundColor = colors [index]
    colorCode.innerHTML = colors [index];}

    // <button class="btn btn2">Random RGB!</button>

   

    function getRandomRGB() {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);

    return `rgba(${r},${g},${b})`;
    }
btn2.addEventListener("click", () => {
    const RandomRGB = getRandomRGB();
    colorPanel.style.backgroundColor = RandomRGB
});



    //  body.style.backgroundColor = "blue"{


