const express = require('express');
const mongoose = require('mongoose');
const { Drawing } = require('../models/drawing');
const { Student } = require('../models/student');
const { Session } = require('../models/session');
const authenticateStudent = require('./sessionAuth').authenticateStudent;
const path = require('path');
const log = console.log;
router = express.Router();

/* Login: test@test.com , pw: 123123
 */

// Serving open sessions
router.get('/opensessions', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    Session.find().then((result) => {
        let openSessions = [];
        for (const s of result) {
            openSessions.push({
                session_id: s._id,
                session_name: s.title
            });
        }
        res.send(JSON.stringify(openSessions));
    }, (error) => {
        log(error);
    });
});

// Add a binding to handle '/sketchbook'
router.get('/', authenticateStudent, (req, res) => {
    // Use the view 'sketchbook', inside the layout 'studentLayout'. Set a different title
    res.render("sketchbook", {
        layout: 'studentLayout',
        title: 'Instasketch - Sketchbook'
    });
});

router.post('/', authenticateStudent, (req, res) => {
    // Get the student id from the session
    const studentID = req.session.user;
    Student.findById(studentID).then((student) => {
        const drawing = new Drawing({
            student_id: student._id,
            title: req.body.title,
            submitted: req.body.session_id !== "None", // If it's none, then it wasn't submitted to a session
            min_since_edit: 0, // 0 minutes because the drawing will be saved now
            svg: req.body.svg
        });
        // If a session was selected
        // TODO: Test this here with real session data
        if(req.session_id !== "None"){
            drawing.session_id = req.body.session_id;
        }
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
