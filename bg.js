const body = document.querySelector("body")

const IMG_NUMBER = 8;

function handleImgLoad(){
    console.log('s')
}

function paintImage(imageNumber){
    const image = new Image();
    image.src = `/images/${imageNumber + 1}.jpg`
    body.prepend(image);
    image.classList.add("bgImage")
    image.addEventListener("loadend", handleImgLoad )
}

function genRandom(){
    const number = Math.floor(Math.random() * IMG_NUMBER);
    return number;
}

function init(){
    const randomNumber = genRandom();
    paintImage(randomNumber);
}

init()