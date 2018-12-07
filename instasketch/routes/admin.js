const express = require('express');
const router = express.Router();
const authenticateTeacher = require('./sessionAuth').authenticateTeacher;
const { ObjectID } = require('mongodb');
const { Student } = require('../models/student');

// GET: 'admin' page - AJAX retrieve all students from database
router.get('/', authenticateTeacher, (req, res) => {
  res.render('admin', {layout: 'adminLayout', title: 'Instasketch - Admin'});
});

// GET: 'addStudent' page when admin clicks 'ADD' button
router.get('/addStudent', authenticateTeacher, (req, res) => {
    res.render('addStudent', {layout: 'addStudentLayout', title: 'Admin - Add Student'});
});

// POST: 'addStudent' page when admin registers a student account
router.post('/addStudent', authenticateTeacher, (req, res) => {
  console.log(req.body);
  const newStudent = new Student({
    first_name: req.body.firstName,
    last_name: req.body.lastName,
    school: req.body.school,
    teacher_id: req.body.teacher_id,
    email: req.body.email,
    password: req.body.password,
    province: req.body.province,
    path: "",
  });

  // Save newStudent to the database
  newStudent.save().then((newstudent) => {
    res.redirect("/admin");
  }, (error) => {
    res.status(400).send(error); // 400 for bad request
  });
});

// Modify student
router.post('/modify', authenticateTeacher, (req, res) => {
  console.log('body', req.body);
  req.session.modified = req.body.modifying_id;
  res.status(200).send();
});

// DELETE: delete student from the database via the page /addStudent
router.delete('/remove/:id', authenticateTeacher, (req, res) => {
  const id = req.params.id;
  console.log('id received:', id);
  // Good practise is to validate the id
  if (!ObjectID.isValid(id)) {
    return res.status(404).send()
  }

  // Otheriwse, findByIdAndRemove
  Student.findByIdAndRemove(id).then((student) => {
    if (!student) {
      res.status(404).send()
    } else {
      res.send({ student })
    }
  }).catch((error) => {
    res.status(400).send(error)
  })
});

module.exports = router;
