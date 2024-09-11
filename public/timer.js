window.onload = () => {
    const timer = document.getElementById('timer');

    const sec = 60;

    const seconds = sec * 1000;

    const setTime = seconds;
    const starTime = Date.now();
    const futureTime = starTime + setTime;

    const timerLoop = setInterval(countDownTimer, 100);
    countDownTimer();

    function countDownTimer() {
        const currentTimer = Date.now();
        const remainingTime = futureTime - currentTimer;

        // timer
        const secs = Math.floor((remainingTime / (1000))).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });

        timer.innerHTML = `<div>${secs}</div>`;

        if (remainingTime <= 0) {
            clearInterval(timerLoop);
            timer.innerHTML = `<div>0<div>`;
            location.href = "/";
        }
    }

    const url = new URL(location.href)
    if (url.searchParams.has("colour")) {
        fetch("/change-colour", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ colour: url.searchParams.get("colour") })
        })
    }

    if (url.searchParams.has("question")) {
        document.getElementById("question").innerHTML = url.searchParams.get("question")
    }
}
