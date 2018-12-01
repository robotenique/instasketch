const express = require('express');
const path = require('path');
// Import the models
const { Submission } = require('../models/submission');
const ObjectID = require('mongodb').ObjectID;
router = express.Router();

// Add a binding to handle '/teacher-submissions'
router.get('/', (req, res) => {
	res.render("teacherSubmissions", {layout: 'teacherSubmissionsLayout'});
})

//get all the submissions
router.get('/submissions', (req, res) => {
	Submission.find().then((result) => {
		res.send({ result })
	}, (error) => {
		res.status(400).send(error)
	}).catch((error) => {
		res.status(400).send(error)
	})
})

//find a submission by its id
router.get('/:id', (req, res) => {
	const id = req.params.id;

	// Good practise is to validate the id
	if (!ObjectID.isValid(id)) {
		return res.status(404).send()
	}

	// Otheriwse, findById
	Submission.findById(id).then((result) => {
		if (!result) {
			res.status(404).send()
		} else {
			res.send({ result })
		}
	}).catch((error) => {
		res.status(400).send(error)
	})
})

//change a specific submission using its id
router.post('/:id', (req, res) => {
	const id = req.params.id;
	const submission = req.body;

	// Good practice is to validate the id
	if (!ObjectID.isValid(id)) {
		return res.status(404).send()
	}

	// Otheriwse, findById
	Submission.findByIdAndUpdate(id, {$set: {
		session_id: submission.session_id,
		drawing_id: submission.drawing_id,
		comments: submission.comments
	}}).then((result) => {
		if (!result) {
			res.status(404).send()
		} else {
			res.send({ result })
		}

	}).catch((error) => {
		res.status(400).send(error)
	})
})

module.exports = router;