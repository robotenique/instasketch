const express = require('express');
const mongoose = require('mongoose');
const { Drawing } = require('../models/drawing');
const { Student } = require('../models/student');
const { Session } = require('../models/session');
const { Submission } = require('../models/submission');
const authenticateStudent = require('./sessionAuth').authenticateStudent;
const path = require('path');
const log = console.log;
router = express.Router();

/* Login: test@test.com , pw: 123123
 */

// Serving open sessions which teacher_id is the same teacher as the current student
router.get('/opensessions', authenticateStudent, (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    Student.findById(req.session.user).then((student) => {
        Session.find({teacher_id: student.teacher_id, open: true}).then((result) => {
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
            res.status(404).send();
        });
    }).catch((error) => {
        log(error);
        res.status(404).send();
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
            creation_date: new Date(),
            svg: req.body.svg
        });
        // Save drawing to the database
        drawing.save().then((result) => {
            // If a session was selected
            if(req.body.session_id !== "None") {
                const sub = new Submission({
                    session_id: req.body.session_id,
                    drawing_id: result._id,
                    comments: "",
					marked: false
                });
                // Need to update the total_submission from the session
                sub.save().then((sub) => {
                    increaseSessionCounter(sub.session_id);
                }).catch((error) => {
                    log(error);
                    res.status(500).send();
                });
            }
            res.send(drawing);
        }).catch((error) => {
            log("ERROR:", error);
            res.status(400).send();
        });
    });
});

function increaseSessionCounter(session_id) {
    Session.findById(session_id).then((currSession) => {
        if(currSession) {
            currSession.total_submissions += 1;
            currSession.save();
        }
    }, (error) => {
        log("Error: ", error);
    });
}

module.exports = router;
