const express = require('express');
// Import the models
const { Teacher } = require('../models/teacher');
const ObjectID = require('mongodb').ObjectID;
router = express.Router();

// Add a binding to handle '/teacher-profile'
router.get('/', (req, res) => {
	res.render("teacherProfile", {layout: 'teacherProfileLayout'});
})

//find a teacher by its id
router.get('/:id', (req, res) => {
	const id = req.params.id;

	// Good practise is to validate the id
	if (!ObjectID.isValid(id)) {
		return res.status(404).send()
	}

	// Otheriwse, findById
	Teacher.findById(id).then((result) => {
		if (!result) {
			res.status(404).send()
		} else {
			res.send({ result })
		}
	}).catch((error) => {
		res.status(400).send(error)
	})
})

//change a specific teacher using its id
router.post('/:id', (req, res) => {
	const id = req.params.id;
	const teacher = req.body;

	// Good practice is to validate the id
	if (!ObjectID.isValid(id)) {
		return res.status(404).send()
	}

	// Otheriwse, findById
	Teacher.findByIdAndUpdate(id, {$set: {
		first_name: teacher.first_name,
		last_name: teacher.last_name,
		school: teacher.school,
		email: teacher.email,
		province: teacher.province,
		password: teacher.password,
		path: teacher.path
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