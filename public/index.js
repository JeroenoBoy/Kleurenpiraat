window.onload = () => {
    const socket = new WebSocket("/", "dingus");

    const connection = new WSConnection(socket)

    const colormap = {
        "red": "#cc5555",
        "yellow": "#cccc55",
        "blue": "#5555cc",
        "green": "#55cc55",
    }

    connection.on("color-change", (msg) => {
        const element = document.querySelector("body")
        element.style["background-color"] = colormap[msg]

        const text = document.getElementById("kleur-text")
        text.innerHTML = msg
    })

    socket.addEventListener("open", e => {
        console.log(`Opened socket to`, e.target.url)
        connection.send("hello");
    })

}

