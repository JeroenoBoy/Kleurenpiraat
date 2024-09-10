const WSConnection = require("../WSConnection");

const router = require("express").Router()
const wsServer = require("..").wsServer
router.post("/qr-scanned", (req, res) => {
    if (req.session.authenticated) { 
        res.status(403).send("User already has an account");
        return 
    }
    const scannedqrcode = req.body.code
    const myId = req.session.user.id

    const connection = wsServer.connections.find(it => it.id == scannedqrcode)
    if (connection == null) {
        res.status(400).send("User not found!")
        return
    }

    connection.send("qr-code-scanned", `${myId}`)

    res.status(200).send("Succes!")
})

module.exports = router
