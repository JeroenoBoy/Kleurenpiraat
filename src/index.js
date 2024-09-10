require("dotenv").config()
const express = require("express")
const session = require("express-session")
const createWSServer = require("./WSServer.js");
const qrScannedRouter = require("./routes/qr-scanned.js")

const users = require('./userDatabase').userDatabase;
const port = parseInt(process.env.PORT ?? "3000");
const app = express()

app.use(express.static("public"));
app.use(session({
    secret: process.env.SECRET ?? "ready your dingus",
    resave: false,
    saveUninitialized: false,
    cookie: { maxage: 3000000 }
}));

const colourData = ["red", "blue", "yellow", "green"]
function GetRandomColour() {
    return colours[Math.floor(Math.random() * colours.length)];
}

app.use("/", qrScannedRouter)

app.get("/api", (req, res) => {
    res.status(200).send("Hello World!");
})

app.get("/give-cookie", (req, res) => {
    res.status(200).send("Waiting for user input to create cookie");
})

app.post("/give-cookie", (req, res) => {
    try {
        if (req.body.username == null) {
            return
        }
        let checkForUser = users.find((data) => req.body.username === users.name);
        if (req.session.authenticated) {
            res.status(403).send("User already has an account");
        } else if (!checkForUser) {

            //creates new user
            let newUser = {
                name: req.body.username,
                colour: GetRandomColour()
            }
            users.push(newUser);

            //pushes cookie to end-user
            req.session.authenticated = true;
            req.session.user = newUser;
            res.status(200).send("Success");
        } else {
            res.status(403).send("This username already exists!");
        }
    } catch (e) {
        console.log(e);
    }
});

const server = app.listen(port, () => {
    console.log(`🌈 Kleurenpiraat is actief op poort ${port} 🚀`)
})

module.exports.wsServer = createWSServer(server)
