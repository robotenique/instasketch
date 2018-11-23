const express = require('express');
// Import the models
const { User } = require('../models/user');
router = express.Router();

// Add a binding to handle '/test'
router.get('/', (req, res) => {
    console.log("HI I AM TEST!! <I should appear at your console>");
    res.send("Good luck ppl (I should appear at the webpage!) ");
})
// This is the route: localhost:3000/tests/new-user
router.post('/new-user', (req, res) => {
    // Create a new student
    const user = new User({
        name: "New boi"
    })

    user.save().then((result) => {
        console.log("USER saved into database!")
        // Save and send object that was saved
        res.send({
            result
        });
    }, (error) => {
        res.status(400).send(error) // 400 for bad request
    });
    console.log("----- received post ------")
});

module.exports = router;

