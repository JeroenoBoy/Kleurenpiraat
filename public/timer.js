window.onload = () => {
const timer = document.querySelector('.timer');


const hr = 0;
const min = 0;
const sec = 30;

const hours = hr * 3600000;
const minutes = min * 60000;
const seconds = sec * 1000;
const setTime = hours + minutes + seconds;
const starTime = Date.now();
const futureTime = starTime + setTime;

const timerLoop = setInterval(countDownTimer, 1000);
countDownTimer();

function countDownTimer() {
    const currenTime = Date.now();
    const remainingTime = futureTime - currenTime;

    // timer
    const secs = Math.floor((remainingTime / (1000)) %60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false});

    timer.innerHTML = `
    <div>${secs}</div>    
    `;



    if(remainingTime < 0) {
        clearInterval(timerLoop);
    }
}
}