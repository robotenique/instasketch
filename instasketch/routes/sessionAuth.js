/* Holds important middlewares for the routes!
You can import them using:
    const sessionAuth = require("sessionAuth");
Or more directly, for e.g.:
    const sessionChecker = require('sessionAuth').sessionChecker;
*/
const { Student } = require('../models/student');
const { Teacher } = require('../models/teacher');

module.exports.sessionChecker = (req, res, next) => {
    if (req.session.user) {
        if (req.session.isTeacher)
            res.redirect('/admin');
        else
            res.redirect('/sketchbook');
    }
    else {
        next();
    }
}

// Make sure we have an authenticated student
module.exports.authenticateStudent = (req, res, next) => {
    if (req.session.user && !req.session.isTeacher) {
        Student.findById(req.session.user).then((student) => {
            if (!student) {
                return Promise.reject();
            } else {
                req.user = student;
                next();
            }
        }).catch((error) => {
            res.redirect('/login');
        });
    } else {
        res.redirect('/login');
    }
}
// Make sure we have an authenticated teacher
module.exports.authenticateTeacher = (req, res, next) => {
    if (req.session.user && req.session.isTeacher) {
        Teacher.findById(req.session.user).then((teacher) => {
            if (!teacher) {
                return Promise.reject();
            } else {
                req.user = teacher;
                next();
            }
        }).catch((error) => {
            res.redirect('/login');
        });
    } else {
        res.redirect('/login');
    }
}