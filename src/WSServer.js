const ws = require("websocket");
const WSConnection = require("./WSConnection")
const EventEmitter = require("node:events");
const { wsServer } = require(".");
const session = require("express-session");

class WSServer {

    /** @type {require("express-session")} */
    sessionManager;
    /** @type {ws.server} */
    wsServer
    /** @type {WSConnection[]} */
    connections = []

    /** @param {ws.server} wsServer */
    constructor(wsServer, session) {
        this.wsServer = wsServer;
        this.sessionManager = session;
        this.wsServer.on("request", (r) => this.handleRequest(r))
    }

    /** @private @param {ws.request} request */
    handleRequest(request) {
        this.sessionManager(request.httpRequest, {}, () => {
            if (request.requestedProtocols[0] != "dingus") {
                console.log(`[${new Date().toDateString()}] Rejected connection with protocols '${request.requestedProtocols.join(", ")}'`)
                request.reject(400, "Must use 'dingus' protocol")
                return
            }

            const testCookie = request.httpRequest.session.user;
            if (testCookie == null) {
                console.log(`[${new Date().toDateString()}] Rejected connection with no cookie`)
                request.reject(401, "No data cookie")
                return
            }

            const name = testCookie.name;
            const color = testCookie.colour;
            let connection = request.accept("dingus", request.origin)
            console.log(`[${new Date().toDateString()}] New incomming connection`)
            this.connections.push(new WSConnection(connection, name, color))
        })
    }
}



module.exports = function createWSServer(server, session) {
    const wsServer = new ws.server({
        httpServer: server,
        autoAcceptConnections: false
    })

    return new WSServer(wsServer, session);
}
