const express = require("express")

const port = 3000;
const app = express()

app.use(express.static("public"));

app.get("/api", (req, res) => {
    res.status(200).send("Hello World!");
})

app.listen(port, () => {
    console.log(`🌈 Kleurenpiraat is actief op poort ${port} 🚀`)
})
