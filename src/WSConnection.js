const ws = require("websocket")
const WSConnectionBase = require("../public/WSConnection")

module.exports = class WSConnection extends WSConnectionBase {
    /** @type {string} @readonly */
    name
    /** @type {string} @readonly */
    color

    /**
      * @param {ws.connection} name
      * @param {string} name
      * @param {string} color
      */
    constructor(wsConnection, name, color) {
        super(wsConnection)
        this.color = color;
        this.name = name;
    }

    handleHello(msg) {

    }
}
