const express = require('express');
const path = require('path');
// Import the models
const { Student } = require('../models/student');
const { Teacher } = require('../models/teacher');
const ObjectID = require('mongodb').ObjectID;
router = express.Router();

// Add a binding to handle '/test'
router.get('/', (req, res) => {
	res.sendFile(path.resolve('../phase2_1/public/studentProfile.html'));
})

// This is the route: localhost:3000/tests/new-user
//body has json of student object
router.post('/new-student', (req, res) => {
    // Create a new student
    const student = req.body;
	const new_student = new Student({
		first_name: student.first_name,
		last_name: student.last_name,
		school: student.school,
		email: student.email,
		province: student.province,
		//CHANGE THIS OBJECT ID TO PROPER TEACHER ID ----------------------()()()(()()()()()())()()()------------------------------
		teacher_id: new ObjectID(),
		password: student.password,
		path: student.path
	})

    new_student.save().then((result) => {
        console.log("student saved into database!")
        // Save and send object that was saved
        res.send({
            result
        });
    }, (error) => {
        res.status(400).send(error) // 400 for bad request
    });
    console.log("----- received post ------")
});

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

//find a student by its id
router.get('/:id', (req, res) => {
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
router.post('/:id', (req, res) => {
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
