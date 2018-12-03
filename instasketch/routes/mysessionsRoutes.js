const express = require('express');
const path = require('path');
const authenticateTeacher = require('./sessionAuth').authenticateTeacher;
// Import the models
const { Session } = require('../models/session');
const ObjectID = require('mongodb').ObjectID;
router = express.Router();

// Add a binding to handle /mysessions
router.get('/', authenticateTeacher, (req, res) => {
    res.render('mysessions', {layout: 'mysessionsLayout'});
})

// Get all sessions for currently logged in teacher
router.get('/sessions', authenticateTeacher, (req, res) => {
    const teacher = req.session.user;

    Session.find({teacher_id: teacher}).then((result) => {
        res.send({result});
    }, (error) => {
        res.status(400).send(error);
    }).catch((error) => {
        res.status(400).send(error);
    })
})

// Add new session. Request body expects JSON with one attribute, the title.
router.post('/sessions', authenticateTeacher, (req, res) => {
    // Create a new session
    const session = new Session({
        'teacher_id': req.session.user,
        'title': req.body.title,
        'date': new Date(),
        'marked_submissions': 0,
        'total_submissions': 0,
        'open': true
    });

    // Save session to database
    session.save().then((result) => {
        res.send({result});
    }, (error) => {
        res.status(400).send(error);
    })
})

// Given list of session IDs, return session objects with those IDs
router.get('/sessions', authenticateTeacher, (req, res) => {
    // Retrieve and validate IDs
    const ids = req.body.session_ids;
    ids.forEach((id) => {
        if (!ObjectID.isValid(id))
            return res.status(404).send();
    });

    Session.find({_id: { $in: ids }}).then((result) => {
        res.send({result});
    }, (error) => {
        res.status(400).send(error);
    }).catch((error) => {
        res.status(400).send(error);
    })
})


// Find a session using its id
router.get('/sessions/:id', authenticateTeacher, (req, res) => {
    // Retrieve and validate id
    const id = req.params.id;
    if (!ObjectID.isValid(id))
        return res.status(404).send();

    // Otherwise, findById
    Session.findById(id).then((result) => {
        if (!result) {
            res.status(404).send();
        } else {
            res.send({result});
        }
    }).catch((error) => {
        res.status(400).send(error);
    })
})

// Change the properties of a specific session using its id
router.patch('/sessions/:id', authenticateTeacher, (req, res) => {
    // Retrieve and validate id
    const id = req.params.id;
    if (!ObjectID.isValid(id))
        return res.status(404).send();

    // Otherwise, findById and update
    const session = req.body;
    Session.findByIdAndUpdate(id, {$set: {
        teacher_id: session.teacher_id,
        title: session.title,
        date: session.date,
        marked_submissions: session.marked_submissions,
        total_submissions: session.total_submissions,
        open: session.open
    }}).then((result) => {
        if (!result) {
            res.status(404).send();
        } else {
            res.send({result});
        }
    }).catch((error) => {
        res.status(400).send(error);
    })
})

module.exports = router;
