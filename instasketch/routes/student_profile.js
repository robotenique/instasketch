const express = require('express');
const path = require('path');
const authenticateStudent = require('./sessionAuth').authenticateStudent;
// Import the models
const { Student } = require('../models/student');
const { Teacher } = require('../models/teacher');
const ObjectID = require('mongodb').ObjectID;
router = express.Router();

// Add a binding to handle '/student-profile'
router.get('/', authenticateStudent, (req, res) => {
	res.render("studentProfile", {layout: 'studentProfileLayout'});
})

//get all the teachers
router.get('/teachers', (req, res) => {
	Teacher.find().then((result) => {
		res.send({ result })
	}, (error) => {
		res.status(400).send(error)
	}).catch((error) => {
		res.status(400).send(error)
	})
})

//get currently logged in student
router.get('/student/', authenticateStudent, (req, res) => {
	const studentID = req.session.user;
	res.redirect('student/'+studentID);
})

//find a student by its id
router.get('/student/:id', authenticateStudent, (req, res) => {
	const id = req.params.id;

	// Good practise is to validate the id
	if (!ObjectID.isValid(id)) {
		return res.status(404).send()
	}

	// Otheriwse, findById
	Student.findById(id).then((result) => {
		if (!result) {
			res.status(404).send()
		} else {
			res.send({ result })
		}
	}).catch((error) => {
		res.status(400).send(error)
	})
})

//change a specific student using its id
router.post('/:id', authenticateStudent, (req, res) => {
	const id = req.params.id;
	const student = req.body;

	// Good practice is to validate the id
	if (!ObjectID.isValid(id)) {
		return res.status(404).send()
	}

	// Otheriwse, findById
	Student.findByIdAndUpdate(id, {$set: {
		first_name: student.first_name,
		last_name: student.last_name,
		school: student.school,
		email: student.email,
		province: student.province,
		teacher_id: student.teacher_id,
		password: student.password,
		path: student.path
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
