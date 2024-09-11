const router = require('express').Router()

const users = require('../userDatabase').userDatabase;

const colourData = ["red", "blue", "yellow", "green"]
function GetRandomColour() {
    return colourData[Math.floor(Math.random() * colourData.length)];
}

router.post("/", (req, res) => {
    try {
        console.log(req.body.username)
        if (req.body.username == null || req.body.username.length < 3) {
            res.redirect('back');
            return;
        }
        let checkForUser = users.find((data) => req.body.username === users.name);
        if (req.session.authenticated) {
            res.status(403).send("User already has an account");
        } else if (!checkForUser) {

            //creates new user
            let newUser = {
                id: Date.now(),
                name: req.body.username,
                colour: GetRandomColour()
            }
            users.push(newUser);

            //pushes cookie to end-user
            req.session.authenticated = true;
            req.session.user = newUser;

            res.redirect('/');
        } else {
            res.status(403).send("This username already exists!");
        }
    } catch (e) {
        console.log(e);
    }
});

module.exports = router; 
