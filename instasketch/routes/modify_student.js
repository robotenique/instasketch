const express = require('express');
const path = require('path');
const authenticateTeacher = require('./sessionAuth').authenticateTeacher;

// Import the models
const { Student } = require('../models/student');
const { Teacher } = require('../models/teacher');
const ObjectID = require('mongodb').ObjectID;
router = express.Router();

//for image submission on cloudinary
const multer = require("multer");
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");

//set up multer and cloudinary for image storage
cloudinary.config({
	cloud_name: "team-07-instasketch",
	api_key: "253678613255651",
	api_secret: "i7WkBoYmFbfpSrYixliWEmaXNsY"
});
const storage = cloudinaryStorage({
	cloudinary: cloudinary,
	folder: "profiles",
	allowedFormats: ["jpg", "png"],
	transformation: [{ width: 500, height: 500, crop: "limit" }]
});
const parser = multer({ storage: storage });

//submits an image on cloudinary and stores its url
router.post('/upload', authenticateTeacher, parser.single("image"), (req, res) => {
	console.log(req.file) // to see what is returned to you
	const image = {};
	image.url = req.file.url;
	image.id = req.file.public_id;
	console.log(image);
	Student.findByIdAndUpdate(req.session.modified, {$set: {
		path: req.file.url
	}}).then((result) => {
		console.log("redirecting to modify student page");
		res.redirect('/modify-student');
	}).catch((error) => {
		console.log(error)
		res.status(400).send(error)
	})
});

// Add a binding to handle '/modify-student'
router.get('/', authenticateTeacher, (req, res) => {
	res.render("modifyStudent", {layout: 'modifyStudentLayout'});
})

//get currently selected student
router.get('/student/', authenticateTeacher, (req, res) => {
	const studentID = req.session.modified;
	res.redirect('student/'+studentID);
})

//find a student by its id
router.get('/student/:id', authenticateTeacher, (req, res) => {
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
router.patch('/:id', authenticateTeacher, (req, res) => {
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
		console.log(error)
		res.status(400).send(error)
	})
})

module.exports = router;
