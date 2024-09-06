const ws = require("websocket");


module.exports = function createWSServer(server) {
    const wsServer = new ws.server({
        httpServer: server,
        autoAcceptConnections: false
    })

    wsServer.on("request", (req) => {

        const dataCookie = req.cookies.find(it => it.name == "data");
        if (dataCookie == null) {
            req.reject(401, "No data cookie")
            return
        }

        const name = dataCookie.value.split(":")[0]
        const color = dataCookie.value.split(":")[1]

        let connection = req.accept("dingus", req.origin)
        connection.on("message", (message) => {
            console.log(message.utf8Data);
            if (message.utf8Data == "Hello!") {
                connection.send(`Hi! ${name}, you are on team ${color}`);
            }
        })
        connection.on("close", (code, description) => {
            console.log(`[${new Date().toDateString()}] Connection lost for '${req.remoteAddress}' reason: '${description}'`)
        })
        console.log(`[${new Date().toDateString()}] New incomming connection '${req.remoteAddress}'`)
    })

    return wsServer
}


