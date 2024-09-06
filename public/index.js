
const socket = new WebSocket("/", "dingus");

socket.addEventListener("open", e => {
    console.log(`Opened socket to`, e)
})

socket.addEventListener("message", message => {
    console.log(message.data)
})

setTimeout(() => {
    socket.send("Hello!");
}, 500)

