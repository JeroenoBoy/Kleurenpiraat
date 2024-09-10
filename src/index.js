require("dotenv").config()
const express = require("express")
const createWSServer = require("./WSServer.js");
const giveCookiesRouter = require("./routes/give-cookie.js");
const qrScannedRouter = require("./routes/qr-scanned.js")

const users = require('./userDatabase').userDatabase;
const port = parseInt(process.env.PORT ?? "3000");
const app = express()

const sessionParser = require("express-session")({
    secret: process.env.SECRET ?? "ready your dingus",
    resave: false,
    saveUninitialized: false,
    cookie: { maxage: 3000000 }
})

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }))
app.use(sessionParser);

const colourData = ["red", "blue", "yellow", "green"]
function GetRandomColour() {
    return colourData[Math.floor(Math.random() * colourData.length)];
}

app.use("/give-cookie", giveCookiesRouter)
app.use("/", qrScannedRouter)

app.get("/api", (req, res) => {
    res.status(200).send("Hello World!");
})

const server = app.listen(port, () => {
    console.log(`🌈 Kleurenpiraat is actief op poort ${port} 🚀`)
})

module.exports.wsServer = createWSServer(server, sessionParser)
