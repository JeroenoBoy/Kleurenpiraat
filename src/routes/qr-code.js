const qrcode = require("qrcode")
const config = require("../config")

const router = require("express").Router()
const wsServer = require("..").wsServer

router.get("/", async (req, res) => {
    if (!req.session.authenticated) {
        res.status(403).send("You are not logged in");
        return
    }

    if (req.query.lol == "true") {
        res.status(200).send(await qrcode.toBuffer(`https://boulderbugle.com/kleurenpiraat-IhamkRYN`))
        return
    }

    const id = req.session.user.id
    res.status(200).send(await qrcode.toBuffer(`${config.baseUrl}/u/${id}`))
})

router.post("/", (req, res) => {
    if (!req.session.authenticated) {
        res.status(403).send("You are not logged in");
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
