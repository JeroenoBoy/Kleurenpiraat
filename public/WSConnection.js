class WSConnection {

    /** @type {ws.connection} */
    wsConnection
    /** @private @type {{ [key: string]: ((msg: string) => void)[] }} */
    callbacks

    /**
      * @param {ws.connection} wsConnection 
      */
    constructor(wsConnection) {
        this.wsConnection = wsConnection;
        this.callbacks = {};

        const addListenerFunc = typeof (wsConnection.on) == "function" ? "on" : "addEventListener"
        wsConnection[addListenerFunc]("message", (msg) => {
            if (msg.type != "utf8") return
            const split = msg.utf8Data.split(":");
            if (split.length != 2) return
            const eventName = split[0]
            const eventValue = split[1]
            this.callbacks[eventName]?.forEach((cb) => cb(eventValue))
        })
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
    emit(name, value) {
        if (name.find(":") > 0) throw new Error("name cannot contain ':'")
        if (value.find(":") > 0) throw new Error("value cannot contain ':'")
        const msg = `${name}:${value}`
        this.wsConnection.send(msg)
    }
}

try {
    module.exports = WSConnection
} catch (e) {
}
