const express = require('express');
const log = console.log;
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
	Teacher.findByIdAndUpdate(req.session.user, {$set: {
		path: req.file.secure_url
	}}).then((result) => {
		res.redirect('/teacher-profile');
	}).catch((error) => {
		console.log(error)
		res.status(400).send(error)
	})
});

// Add a binding to handle '/teacher-profile'
router.get('/', authenticateTeacher, (req, res) => {
	res.render("teacherProfile", {layout: 'teacherProfileLayout'});
})

//get all the students for the logged in teacher
router.get('/students', (req, res) => {
	Student.find({"teacher_id": req.session.user}).then((result) => {
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
router.patch('/:id', authenticateTeacher, (req, res) => {
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
