const express = require('express');
const { Drawing } = require('../models/user');
const path = require('path');
router = express.Router();

// Add a binding to handle '/sketchbook'
// TODO: add authentication to this route
//router.get('/', authenticateStudent, (req, res) => {})

router.get('/', (req, res) => {
	res.render("sketchbook", {layout: 'studentLayout', title: 'Instasketch - Sketchbook'});
})
// This is the route: localhost:3000/tests/new-user
router.post('/', (req, res) => {

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
