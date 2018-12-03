const express = require('express');
const path = require('path');
const authenticateAnyUser = require('./sessionAuth').authenticateAnyUser;
const authenticateStudent = require('./sessionAuth').authenticateStudent;
// Import the models
const { Drawing } = require('../models/drawing');
const ObjectID = require('mongodb').ObjectID;
router = express.Router();

// Add a binding to handle /mydrawings
router.get('/', authenticateStudent, (req, res) => {
    res.render('mydrawings', {layout: 'mydrawingsLayout'});
})

// Get all drawings for currently logged in student
router.get('/completelist', authenticateStudent, (req, res) => {
    const student = req.session.user;

    Drawing.find({student_id: student}).then((result) => {
        res.send({result});
    }, (error) => {
        res.status(400).send(error);
    }).catch((error) => {
        res.status(400).send(error);
    })
})

// Given list of drawing IDs, return drawing objects with those IDs
router.post('/specificlist', authenticateAnyUser, (req, res) => {
    // Retrieve and validate IDs
    const ids = req.body.drawing_ids;
    ids.forEach((id) => {
        if (!ObjectID.isValid(id))
            return res.status(404).send();
    });

    Drawing.find({_id: { $in: ids }}).then((result) => {
        res.send({result});
    }, (error) => {
        res.status(400).send(error);
    }).catch((error) => {
        res.status(400).send(error);
    })
})

// Find a drawing using its id
router.get('/:id', authenticateStudent, (req, res) => {
    // Retrieve and validate id
    const id = req.params.id;
    if (!ObjectID.isValid(id))
        return res.status(404).send();

    // Otherwise, findById
    Drawing.findById(id).then((result) => {
        if (!result) {
            res.status(404).send();
        } else {
            res.send({result});
        }
    }).catch((error) => {
        res.status(400).send(error);
    })
})

// Change the properties of a specific drawing using its id
router.patch('/:id', authenticateStudent, (req, res) => {
    // Retrieve and validate id
    const id = req.params.id;
    if (!ObjectID.isValid(id))
        return res.status(404).send();

    // Otherwise, findById and update
    const drawing = req.body;
    Drawing.findByIdAndUpdate(id, {$set: {
        student_id: drawing.student_id,
        title: drawing.title,
        submitted: drawing.submitted,
        min_since_edit: drawing.min_since_edit,
        svg: drawing.svg
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
