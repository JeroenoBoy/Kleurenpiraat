const socket = new WebSocket("/", "dingus");

const connection = new WSConnection(socket)

connection.on("hello", (msg) => {
    console.log("")
})

socket.addEventListener("open", e => {
    console.log(`Opened socket to`, e.target.url)
})

socket.addEventListener("message", message => {
    console.log(message.data)
})

setTimeout(() => {
    connection.send("hello", "Hi Server!");
}, 500)
