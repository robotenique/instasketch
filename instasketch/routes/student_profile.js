const express = require('express');
const path = require('path');
// Import the models
const { Student } = require('../models/student');
router = express.Router();

// Add a binding to handle '/test'
router.get('/', (req, res) => {
	res.sendFile(path.resolve('../instasketch/public/studentProfile.html'));
})
// This is the route: localhost:3000/tests/new-user
//body has json of student object
router.post('/new-user', (req, res) => {
    // Create a new student
    const student = req.body;

    student.save().then((result) => {
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

