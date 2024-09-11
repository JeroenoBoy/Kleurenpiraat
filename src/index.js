const config = require("./config.js")
const express = require("express")
const createWSServer = require("./WSServer.js");

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

app.use("/give-cookie", require("./routes/give-cookie.js"))
app.use("/qr-code", require("./routes/qr-code.js"))


const server = app.listen(config.port, () => {
    console.log(`🌈 Kleurenpiraat is actief op poort ${config.port} 🚀`)
})

module.exports.wsServer = createWSServer(server, sessionParser)
