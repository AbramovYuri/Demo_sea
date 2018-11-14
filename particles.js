let scrollerText = document.querySelector('.scroller-text').innerHTML;
let scrollLetterCount = 70;
let curentLetter = 0;
let sinusCount = 0;
let cosCount = 0;
let pi = 2 * Math.PI;
let screenHeight = document.querySelector('.demo-screen').offsetHeight;
let scrollLeft = 0;
let scrollDelay = 4;
//let screenWidth = document.querySelector('.demo-screen').offsetWidth;
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
let pointCoord = [];
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let pointSpeed = 1;
let pointCount, canvasWidth, canvasHeight;
let boobleOffset = 0;


addEventListener('resize', resize);
addEventListener('orientationchange', resize);


resize();
pointGenerator();
generateHtmlLetterScroller();

let letter = document.querySelectorAll('.letter');
window.onload = mainLoop();
document.querySelector('.demo-screen').addEventListener('click', mainLoop);

function mainLoop() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    point();
    newPointCoord();
    flyingScroller();
    boobleOffset+= .02;
    requestAnimationFrame(mainLoop);
}

function flyingScroller() {
    scrollLeft +=3;

    let sinusCountSave = sinusCount;
    let test = 0;
    let sin,cos;
    for (let i = 0; i < curentLetter + scrollLetterCount; i++) {
        if (i >= curentLetter && i <= curentLetter + scrollLetterCount) {
            sin = Math.sin(sinusCount);
            cos = Math.cos(cosCount);
            letter[i].style.left = Math.floor(sin * (screenHeight / 10)) + i * 30 - scrollLeft + "px";
            letter[i].style.top = Math.floor(cos*80+screenHeight / 2) + Math.floor((sin*cos) * (screenHeight /10)) + "px";
            // letter[i].style.fontSize = Math.floor(40+sin*sin * 40) + "px";
            letter[i].style.display = "inline-block";
            test++;
        }
        sinusCount += .1;

    }

    if (sinusCountSave <= pi) {
        sinusCount = sinusCountSave + .02;
    } else {
        sinusCount = 0;
    }
    cosCount +=.02;
    if (scrollLeft / 30 === scrollDelay) {
        scrollDelay++;
        letter[curentLetter].style.display = "none";
        curentLetter++;
    }

}

function generateHtmlLetterScroller() {
    for (let i = 0; i < scrollerText.length; i++) {
        document.querySelector('.demo-screen').insertAdjacentHTML('afterEnd', '<span class="letter"></span>');

    }

    for (let i = 0; i < scrollerText.length; i++) {
        document.getElementsByClassName('letter')[i].innerHTML = scrollerText[i];
    }
}


//!!!!!!!!!!!!!!!!!!!    Вычисляем новые координаты точки      !!!!!!!!!!!!!!!!!

function newPointCoord() {

    for (let i = 0; i < pointCount; i++) {
        pointCoord[i][1] = pointCoord[i][1] - pointCoord[i][2];
        if (pointCoord[i][1] < 0) {
            pointCoord[i][1] = canvasHeight;
        }

    }

}

//!!!!!!!!!!!!!!!!!!      Рисуем точки      !!!!!!!!!!!!!!!!!!

function point() {

    let circle = 2 * Math.PI;

    for (let i = 0; i < pointCount; i++) {
        let opacity = pointCoord[i][1] / canvasHeight - pointCoord[i][3];
        if (opacity>0){
            xOffset = Math.sin(pointCoord[i][4])*(pointCoord[i][2] * 3) *5;
            pointCoord[i][4]+=.02;
            ctx.beginPath();
            ctx.arc(pointCoord[i][0]+xOffset, pointCoord[i][1], pointCoord[i][2] * 4, 0, circle);
            ctx.fillStyle = `rgba(200,200,200, ${opacity}`;
            ctx.fill();
        }
    }

}


function resize() {
    let particlesDiv = document.getElementsByClassName("particles");
    canvas.width = particlesDiv[0].offsetWidth;                         //Устанавливаем размеры CANVAS из CSS свойств DIV particles
    canvas.height = 650;  //particlesDiv[0].offsetHeight;           //  высота элемента с пузырями
    canvasWidth = canvas.clientWidth;
    canvasHeight = canvas.clientHeight;

    pointCount = (canvasWidth * canvasHeight) / 1500;    // Количество точек (автоматически)
    pointGenerator();
}


//!!!!!!!!!!!!!!!!!!!!!     Генератор случайных точек   !!!!!!!!!!!!!!!!!!!!!

function pointGenerator() {

    let x, y, vY, sinOffset, opacity;

    for (let i = 0; i < pointCount; i++) {

        x = Math.random() * canvasWidth;

        y = Math.random() * canvasHeight;

        opacity = Math.random();

        sinOffset = Math.random() * (2 * Math.PI);

        vY = Math.random() * pointSpeed;
        if (vY === 0) {
            vY = Math.random() + .1;
        }

        pointCoord[i] = [x, y, vY, opacity, sinOffset];
    }
}
