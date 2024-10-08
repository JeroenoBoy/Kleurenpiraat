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

app.use(sessionParser);
app.get(/(\/$)|(\/.*\.html$)/i, (req, res, next) => {
    const isLoginPage = req.url.toLowerCase().endsWith("login.html")
    const isAuthenticated = req.session.authenticated

    if (isAuthenticated && isLoginPage) {
        res.redirect("/")
    } else if (!isAuthenticated && !isLoginPage) {
        res.redirect("/login.html")
    } else {
        next()
    }
})

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use("/give-cookie", require("./routes/give-cookie.js"))
app.use("/qr-code", require("./routes/qr-code.js"))
app.use("/change-colour", require("./routes/change-colour.js"))
app.use("/u", require("./routes/return-user.js"))


const server = app.listen(config.port, () => {
    console.log(`🌈 Kleurenpiraat is actief op poort ${config.port} 🚀`)
})

module.exports.wsServer = createWSServer(server, sessionParser)
