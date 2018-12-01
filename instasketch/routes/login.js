const express = require('express');
const router = express.Router();
const { Student } = require('../models/student');
const { Teacher } = require('../models/teacher');
const sessionChecker = require('./sessionAuth').sessionChecker;

router.get('/', sessionChecker, (req, res) => {
    res.render("login", {layout: 'loginLayout', title: 'Instasketch - login'});
});

router.post('/', sessionChecker, (req, res) => {
    console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;
    // find the user with this email and password
    // IMPORTANT: Find by student FIRST, then if not successful, by teacher
    Student.findByEmailPassword(email, password).then((student) => {
        if (!student) { // If not student, check if it's a teacher
            console.log("STUDENT NOT FOUND");
            Teacher.findByEmailPassword(email, password).then((teacher) => {
                if(!teacher) {
                    res.status(403).send();
                }
                else{
                    // Add to the session cookie
                    req.session.user = teacher._id;
                    req.session.isTeacher = true;
                    res.status(200).send();
                }
            });
        } else {
            console.log(student);
            console.log("RESOLVED STUDENT");
            // Add to the session cookie
            req.session.user = student._id;
            req.session.isTeacher = false;
            res.status(200).send();
        }
    }).catch((error) => {
        res.status(400).send();
    });
});
// the route /login/logout
router.get('/logout', (req, res) => {
    console.log("Request to logout!");
    req.session.destroy((error) => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.redirect("/login");
        }
    })
})

module.exports = router;
