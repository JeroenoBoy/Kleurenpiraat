const router = require("express").Router()

router.post("/", (req, res) => {
    if (!req.session.authenticated) {
        res.status(403).send("Whoopsie Doopsie, you awe not awwowed to awwces vhis wighw now 😳")
        return
    }

    const colour = req.body.colour;
    req.session.user.colour = colour;
    req.session.save()

    res.status(200).send("Color changey yippey!")
    return
})

module.exports = router;
