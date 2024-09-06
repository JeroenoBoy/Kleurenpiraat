const ws = require("websocket");


module.exports = function createWSServer(server) {
    const wsServer = new ws.server({
        httpServer: server,
        autoAcceptConnections: false
    })

    wsServer.on("request", (req) => {
        let connection = req.accept("dingus", req.origin)
        connection.on("message", (message) => {
            console.log(message);
            if (message.utf8Data == "Hello!") {
                connection.send("Hi!");
            }
        })
        connection.on("close", (code, description) => {
            console.log(`[${new Date().toDateString()}] Connection lost for '${req.remoteAddress}' reason: '${description}'`)
        })
        console.log(`[${new Date().toDateString()}] New incomming connection '${req.remoteAddress}'`)
    })

    return wsServer
}


