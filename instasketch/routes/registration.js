const express = require('express');
const router = express.Router();
const { Student } = require('../models/student');
const { Teacher } = require('../models/teacher');

// Registration page to create an account
router.get('/', (req, res) => {
  res.render("registration", {layout: 'registrationLayout'});
});

// After User registers his/her account
router.post('/', (req, res) => {
  // Create new User
  console.log(req.body);

  if (req.body.position === "student") {
    const newStudent = new Student({
      first_name: req.body.firstName,
      last_name: req.body.lastName,
      school: req.body.school,
      teacher_id: req.body.teacher_id, // How can we retrieve teacher_id?
      teacher_code: req.body.teacher_code,
      email: req.body.email,
      password: req.body.password,
      province: req.body.province,
      path: "https://res.cloudinary.com/team-07-instasketch/image/upload/v1544069990/profiles/bttv1dhxi17s6dn2ld7r.png",
    });

    // Save newStudent to the database
    newStudent.save().then((newstudent) => {
      res.redirect("/login");
    }, (error) => {
      res.status(400).send(error); // 400 for bad request
    })
  } else if (req.body.position === "teacher") {
    const newTeacher = new Teacher({
      first_name: req.body.firstName,
      last_name: req.body.lastName,
      school: req.body.school,
      teacher_code: req.body.teacher_code,
      email: req.body.email,
      password: req.body.password,
      province: req.body.province,
      path: "https://res.cloudinary.com/team-07-instasketch/image/upload/v1544069990/profiles/bttv1dhxi17s6dn2ld7r.png",
    });

    // Save user to the database
    newTeacher.save().then((newteacher) => {
      res.redirect("/login");
    }, (error) => {
      res.status(400).send(error); // 400 for bad request
    });
  }

});

module.exports = router;
