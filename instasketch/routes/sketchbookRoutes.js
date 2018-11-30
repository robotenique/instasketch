const express = require('express');
const mongoose = require('mongoose');
const { Drawing } = require('../models/drawing');
const { Student } = require('../models/student');
const { Session } = require('../models/session');
const path = require('path');
const log = console.log;
router = express.Router();

// TODO: How would I serve a JSON to a frontend JS??
router.get('/openSessions', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ a: 1 }));

});

// TODO: add authentication to this route
// Add a binding to handle '/sketchbook'
//router.get('/', authenticateStudent, (req, res) => {})
router.get('/', (req, res) => {
    Student.find().then((res) => {
        log(res);
    }, (err) => {
        log(err);
    })
    // Get all current open sessions
    Session.find({open: true}).then((result) => {
        if (result.length === 0) { // No open session
            log("No open session");
        }
        else {
            log("Found open sessions");
        }
        // Use the view 'sketchbook', inside the layout 'studentLayout'. Set a different title
        res.render("sketchbook", {
            layout: 'studentLayout',
            title: 'Instasketch - Sketchbook'
        });
    }, (error) => {
        log("Error finding sessions!");
        res.status(500).send();
    });
});
// This is the route: localhost:3000/tests/new-user
router.post('/', (req, res) => {
    // Currently I'm testing this with a random student... Should properly use req.session.user
    Student.findOne().then((student) => {
        const drawing = new Drawing({
            //student_id: req.session.user.userID
            student_id: student._id,
            title: req.body.title,
            submitted: req.body.session_id !== "None", // If it's none, then it wasn't submitted to a session
            min_since_edit: 0, // 0 minutes because the drawing will be saved now
            svg: req.body.svg
        });
        // Save drawing to the database
        drawing.save().then((result) => {
            res.send(drawing);
        }, (error) => {
            log(error);
            res.status(500).send(error);
        });
    }, (error) => {
        log("Error searching for student :(");
        res.status(500).send(error);
    });
});

module.exports = router;
