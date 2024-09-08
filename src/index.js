const express = require("express")
const createWSServer = require("./WSServer.js");

const port = 3000;
const app = express()

app.use(express.static("public"));

app.get("/api", (req, res) => {
    res.status(200).send("Hello World!");
})

app.get("/give-cookie", (req, res) => {
    res.cookie("data", "Jeroen van de Geest:blue")
    res.status(200).send("Success")
})

const server = app.listen(port, () => {
    console.log(`🌈 Kleurenpiraat is actief op poort ${port} 🚀`)
})

createWSServer(server)
