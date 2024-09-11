const ws = require("websocket")
const { wsServer } = require(".")

module.exports = class WSConnection {
    /** @type {number} @readonly */
    id
    /** @type {string} @readonly */
    name
    /** @type {string} @readonly */
    color

    /** @private @type {{ [key: string]: ((msg: string) => void)[] }} */
    callbacks


    /**
      * @param {ws.connection} name
      * @param {string} name
      * @param {string} color
      */
    constructor(wsConnection, name, color, id) {
        this.wsConnection = wsConnection;
        this.callbacks = {};
        this.id = id
        this.color = color;
        this.name = name;

        wsConnection.on("message", (msg) => {
            if (msg.type != "utf8") return
            const split = msg.utf8Data.split(":");
            if (split.length != 2) return
            const eventName = split[0]
            const eventValue = split[1]
            this.callbacks[eventName]?.forEach((cb) => cb(eventValue))
        })

        this.on("hello", m => this.handleHello(m))
    }

    /**
      * @param {string} event 
      * @param {(msg: string) => void} cb 
      */
    on(event, cb) {
        if (this.callbacks[event] == null) {
            this.callbacks[event] = []
        }
        this.callbacks[event].push(cb);
    }

    /** @param {string} name @param {string} value */
    send(name, value) {
        if (name.indexOf(":") > 0) throw new Error("name cannot contain ':'")
        const msg = `${name}:${value}`
        this.wsConnection.send(msg)
    }

    handleHello(msg) {
        console.log(`[${new Date().toDateString()}] Received hello '${msg}' from '${this.name}'`);
        this.send("name-change", this.name)
        this.send("color-change", this.color)
    }
}
