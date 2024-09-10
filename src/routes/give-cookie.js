const router = require('express').Router()

const users = require('../userDatabase').userDatabase;
 
const colourData = ["red", "blue", "yellow", "green"]
function GetRandomColour() { 
    return colourData[Math.floor(Math.random()*colourData.length)];
}

router.post("/", (req, res) => {
    try {
        if (req.body.username == null) {
            res.status(403).send("No username");
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
            res.status(200).send("Success");
        } else {
            res.status(403).send("This username already exists!");
        }
    } catch(e) { 
        console.log(e);
    }
});

module.exports = router; 