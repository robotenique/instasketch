const express = require('express');
const path = require('path');
const authenticateStudent = require('./sessionAuth').authenticateStudent;
// Import the models
const { Submission } = require('../models/submission');
const { Drawing } = require('../models/drawing');
const ObjectID = require('mongodb').ObjectID;
router = express.Router();

// Add a binding to handle '/student-submissions'
router.get('/', authenticateStudent, (req, res) => {
	res.render("studentSubmissions", {layout: 'studentSubmissionsLayout'});
})

//get all the submissions
router.get('/submissions', authenticateStudent, (req, res) => {
	Submission.find().then((result) => {
		res.send({ result })
	}, (error) => {
		res.status(400).send(error)
	}).catch((error) => {
		res.status(400).send(error)
	})
})

//submissions for a given student id
router.get('/for/:id', authenticateStudent, (req, res) => {
	const id = req.params.id;
	
	Drawing.find({"student_id": id}).then((result) => {
		if(result.length === 0){
			res.send({result});
			return;
		}
		let drawing_ids = [];
		for(let drawing of result){
			drawing_ids.push(drawing._id);
		}
		
		Submission.find({"drawing_id": {$in: drawing_ids}}).then((result) => {
			res.send({ result });
		}, (error) => {
			res.status(400).send(error)
		}).catch((error) => {
			console.log(error)
			res.status(400).send(error)
		})
	}, (error) => {
		res.status(400).send(error)
	}).catch((error) => {
		console.log(error);
		res.status(400).send(error)
	})
})

//find a submission by its id
router.get('/:id', authenticateStudent, (req, res) => {
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

module.exports = router;
