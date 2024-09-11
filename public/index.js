window.onload = () => {
    const socket = new WebSocket("/", "dingus");

    const connection = new WSConnection(socket)

    const colormap = {
        "red": "#cc5555",
        "yellow": "#cccc55",
        "blue": "#5555cc",
        "green": "#55cc55",
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

