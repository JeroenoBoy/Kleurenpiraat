class WSConnection {

    /** @private @type {{ [key: string]: ((msg: string) => void)[] }} */
    callbacks

    /**
      * @param {WebSocket} wsConnection 
      */
    constructor(wsConnection) {
        this.wsConnection = wsConnection;
        this.callbacks = {};

        wsConnection.addEventListener("message", (msg) => {
            if (typeof (msg.data) != "string") return
            const split = msg.data.split(":");
            if (split.length != 2) return
            const eventName = split[0]
            const eventValue = split[1]
            console.log(`[${new Date().toDateString()}] Reveiced`, msg.data)
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
    send(name, value) {
        value ??= ""
        if (name.indexOf(":") > 0) throw new Error("name cannot contain ':'")
        if (value.indexOf(":") > 0) throw new Error("value cannot contain ':'")
        const msg = `${name}:${value}`
        this.wsConnection.send(msg)
    }
}
