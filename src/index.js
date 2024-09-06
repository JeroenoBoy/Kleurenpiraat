const express = require("express")
const createWSServer = require("./websocket.js");

const port = 3000;
const app = express()

app.use(express.static("public"));

app.get("/api", (req, res) => {
    res.status(200).send("Hello World!");
})

const server = app.listen(port, () => {
    console.log(`🌈 Kleurenpiraat is actief op poort ${port} 🚀`)
})

createWSServer(server)
