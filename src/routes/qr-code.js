const qrcode = require("qrcode")
const config = require("../config")

const router = require("express").Router()
const index = require("..")
const { myQuestion } = require("../Vragen")
const { request } = require("express")

router.get("/", async (req, res) => {
    if (req.query.id!=null) {
        res.status(200).send(await qrcode.toBuffer(`${config.baseUrl}/u/${req.query.id}`)) 
        return
    }

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
    const timetostart = Date.now() + 1000
    const question = myQuestion()

    const connection = index.wsServer.connections.find(it => it.id == scannedqrcode)
    if (connection == null) {
        res.status(400).send("User not found!")
        return
    }

    connection.send("qr-code-scanned", JSON.stringify({
        id: myId,
        from: connection.color,
        to: colour,
        timetostart: timetostart,
        question: question,
    }))

    res.status(200).send({
        id: myId,
        colour: colour,
        timetostart: timetostart,
        question: question
    })
})

module.exports = router
