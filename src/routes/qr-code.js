const qrcode = require("qrcode")
const config = require("../config")

const router = require("express").Router()
const index = require("..")

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
    const colour = req.session.user.colour

    const connection = index.wsServer.connections.find(it => it.id == scannedqrcode)
    if (connection == null) {
        res.status(400).send("User not found!")
        return
    }

    connection.send("qr-code-scanned", JSON.stringify({
        id: myId,
        colour: colour,
        question: "Wie is de zon in jouwn dag?"
    }))

    res.status(200).send({
        id: myId,
        question: "Wie is de zon in jouwn dag?"
    })
})

module.exports = router
