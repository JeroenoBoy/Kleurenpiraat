window.onload = () => {

    const url = new URL(location.href)
    const timer = document.getElementById('timer');
    const element = document.querySelector("body");

    const sec = 60;
    const seconds = sec * 1000;

    const setTime = seconds;
    let starTime = Date.now();

    const colourMap = {
        "red": "#cc5555",
        "yellow": "#FFDB58",
        "blue": "#6495ED",
        "green": "#65E67A",
    }

    let from = "557755";
    let to = "cc5555";

    if (url.searchParams.has("from")) {
        from = colourMap[url.searchParams.get("from")].slice(1);
        to = from;
    }

    if (url.searchParams.has("to")) {
        to = colourMap[url.searchParams.get("to")].slice(1);
    }

    if (url.searchParams.has("to")) {
        fetch("/change-colour", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ colour: url.searchParams.get("to") })
        })
    }

    if (url.searchParams.has("timetostart")) {
        starTime = parseInt(url.searchParams.get("timetostart"));
    }

    if (url.searchParams.has("question")) {
        document.getElementById("question").innerHTML = url.searchParams.get("question")
    }

    const futureTime = starTime + setTime;
    const timerLoop = setInterval(countDownTimer, 100);
    countDownTimer();

    function countDownTimer() {
        const currentTimer = Date.now();
        const remainingTime = futureTime - currentTimer;
        const remainingTimePrecentage = remainingTime / setTime;

        //changes colour between old and new user colour (stays the same if colour doesn't change)
        element.style["background-color"] = `#${mixHex(to, from, remainingTimePrecentage)}`;

        // timer
        const secs = Math.min(Math.floor((remainingTime / (1000))), sec).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });

        timer.innerHTML = `<div>${secs}</div>`;

        if (remainingTime <= 0) {
            clearInterval(timerLoop);
            timer.innerHTML = `<div>0<div>`;
            location.href = "/";
        }
    }

    //mixes old and new colour. 
    function mixHex(oldColor, newColor, ratio) {
        const hex = function(x) {
            x = x.toString(16);
            return (x.length == 1) ? '0' + x : x;
        };

        let r = Math.ceil(parseInt(newColor.substring(0, 2), 16) * ratio + parseInt(oldColor.substring(0, 2), 16) * (1 - ratio)),
            g = Math.ceil(parseInt(newColor.substring(2, 4), 16) * ratio + parseInt(oldColor.substring(2, 4), 16) * (1 - ratio)),
            b = Math.ceil(parseInt(newColor.substring(4, 6), 16) * ratio + parseInt(oldColor.substring(4, 6), 16) * (1 - ratio));

        return hex(r) + hex(g) + hex(b);
    }

}
