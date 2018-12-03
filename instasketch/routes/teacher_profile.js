const express = require('express');
const log = console.log;
const authenticateTeacher = require('./sessionAuth').authenticateTeacher;
// Import the models
const { Student } = require('../models/student');
const { Teacher } = require('../models/teacher');
const ObjectID = require('mongodb').ObjectID;
router = express.Router();

// Add a binding to handle '/teacher-profile'
router.get('/', authenticateTeacher, (req, res) => {
	res.render("teacherProfile", {layout: 'teacherProfileLayout'});
})

//get all the students
router.get('/students', (req, res) => {
	Student.find().then((result) => {
		res.send({ result })
	}, (error) => {
		res.status(400).send(error)
	}).catch((error) => {
		res.status(400).send(error)
	})
})

//get all students for a given teacher
router.get('/students/:id', authenticateTeacher, (req, res) => {
	const teacherId = req.params.id;
	
	Student.find({"teacher_id": teacherId}).then((result) => {
		res.send({ result })
	}, (error) => {
		res.status(400).send(error)
	}).catch((error) => {
		res.status(400).send(error)
	})
})

//get currently logged in teacher
router.get('/teacher/', authenticateTeacher, (req, res) => {
	const teacherId = req.session.user;
	res.redirect('teacher/' + teacherId);
})

//find a teacher by its id
router.get('/teacher/:id', authenticateTeacher, (req, res) => {
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
			log(result)
			res.send({ result })
		}
	}).catch((error) => {
		log(id)
		res.status(400).send(error)
	})
})

//change a specific teacher using its id
router.post('/:id', authenticateTeacher, (req, res) => {
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
