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
        "red": "rood",
        "yellow": "geel",
        "blue": "blauw",
        "green": "groen"
    }

    connection.on("color-change", msg => {
        const element = document.querySelector("body")
        element.style["background-color"] = colormap[msg]

        const text = document.getElementById("kleur-text")
        text.innerHTML = colornaam[msg]
    })

    connection.on("qr-code-scanned", msg => {
        const data = JSON.parse(msg)
    })

    socket.addEventListener("open", e => {
        console.log(`Opened socket to`, e.target.url)
        connection.send("hello");
    })

}

