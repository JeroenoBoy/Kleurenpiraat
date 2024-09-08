const ws = require("websocket");
const WSConnection = require("./WSConnection")
const EventEmitter = require("node:events")

class WSServer {

    /** @type {ws.server} */
    wsServer
    /** @type {WSConnection[]} */
    connections = []

    /** @param {ws.server} wsServer */
    constructor(wsServer) {
        this.wsServer = wsServer;
        this.wsServer.on("request", (r) => this.handleRequest(r))
    }

    /** @private @param {ws.request} request */
    handleRequest(request) {
        const dataCookie = request.cookies.find(it => it.name == "data");
        if (dataCookie == null) {
            request.reject(401, "No data cookie")
            return
        }

        const split = dataCookie.value.split(":")
        if (split.length != 2) {
            request.reject(400, "Invalid cookie");
            return
        }

        const name = split[0]
        const color = split[1]
        let connection = request.accept("dingus", request.origin)
        this.connections.push(new WSConnection(connection, name, color))
    }
}



module.exports = function createWSServer(server) {
    const wsServer = new ws.server({
        httpServer: server,
        autoAcceptConnections: false
    })

    return new WSServer(wsServer);
}
