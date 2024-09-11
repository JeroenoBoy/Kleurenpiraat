window.onload = () => {
    const socket = new WebSocket("/", "dingus");

    const connection = new WSConnection(socket)

    const colormap = {
        "red": "#cc5555",
        "yellow": "#FFDB58",
        "blue": "#6495ED",
        "green": "##65E67A",
    }

    const colornaam = {
        "red": "Rood",
        "yellow": "Geel",
        "blue": "Blauw",
        "green": "Groen"
    }

    connection.on("color-change", msg => {
        const element = document.querySelector("body")
        element.style["background-color"] = colormap[msg]

        let text = document.getElementById("kleur-text")
        text.style.color = invertColor(colormap[msg])
        text.innerHTML = colornaam[msg]
    })

    connection.on("qr-code-scanned", msg => {
        const data = JSON.parse(msg)
    })

    socket.addEventListener("open", e => {
        console.log(`Opened socket to`, e.target.url)
        connection.send("hello");
    })

    //inverts color, courtesy of StackOverflow
    function invertColor(hexCode) { 
        if (hexCode.indexOf('#') === 0) {
            hexCode = hexCode.slice(1);
        }
        
        let r = (255 - parseInt(hexCode.slice(0, 2), 16)).toString(16),
            g = (255 - parseInt(hexCode.slice(2, 4), 16)).toString(16),
            b = (255 - parseInt(hexCode.slice(4, 6), 16)).toString(16);
        return '#' + padIt(r) + padIt(g) + padIt(b);
    }

    function padIt(str, len) { 
        len = len || 2;
        let zeros = new Array(len).join('0');
        return(zeros + str).slice(-len);
    }
}

