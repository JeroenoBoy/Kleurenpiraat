require("dotenv").config()
const express = require("express")
const session = require("express-session")
const createWSServer = require("./WSServer.js");

const port = parseInt(process.env.PORT ?? "3000");
const app = express()

app.use(express.static("public"));
app.use(session({
    secret: process.env.SECRET ?? "ready your dingus", 
    resave: false, 
    saveUninitialized: false,
    cookie: {maxage: 3000000}
}));

const colourData = ["red", "blue", "yellow", "green"]
function GetRandomColour() { 
    return colours[Math.floor(Math.random()*colours.length)];
}

app.get("/api", (req, res) => {
    res.status(200).send("Hello World!");
})

app.get("/give-cookie", (req, res) => {
    res.status(200).send("Waiting for user input to create cookie");
})

app.post("/give-cookie", (req, res) => {
    try {
        if (req.body.username) { 
            if (req.session.authenticated) { 
                res.status(403).send("User already has an account");
            } else { 

                //creates new user
                let newUser = { 
                    name: req.body.username,
                    colour: GetRandomColour()
                }


                //pushes cookie to end-user
                req.session.authenticated = true; 
                req.session.user = newUser;
                res.status(200).send("Success");
            }
        }
    } catch(e) { 
        console.log(e);
    }
});

const server = app.listen(port, () => {
    console.log(`🌈 Kleurenpiraat is actief op poort ${port} 🚀`)
})

createWSServer(server)
