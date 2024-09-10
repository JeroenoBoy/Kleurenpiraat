require("dotenv").config()
const express = require("express")
const session = require("express-session")
const createWSServer = require("./WSServer.js");
const qrScannedRouter = require("./routes/qr-scanned.js")

const giveCookieRoute = require('./routes/give-cookie.js');


const port = parseInt(process.env.PORT ?? "3000");
const app = express()

var sessionParser = session({
    secret: process.env.SECRET ?? "ready your dingus", 
    resave: false, 
    saveUninitialized: true,
    cookie: {maxage: 3000000}
})
app.use(sessionParser)
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false}));

app.use('/give-cookie', giveCookieRoute);


app.use("/", qrScannedRouter)

app.get("/api", (req, res) => {
    res.status(200).send("Hello World!");
})


const server = app.listen(port, () => {
    console.log(`🌈 Kleurenpiraat is actief op poort ${port} 🚀`)
})

module.exports.wsServer = createWSServer(server)
