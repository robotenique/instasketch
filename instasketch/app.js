'use strict';

const log = console.log;
const express = require('express');
const port = process.env.PORT || 3000;
const session = require('express-session'); // To store user sessions
const bodyParser = require('body-parser'); // middleware for parsing HTTP body from client
const exphbs = require('express-handlebars'); // Handle the views

// Import our mongoose connection
// Currently inside /models folder
const { mongoose } = require('./models/mongoose');
const ObjectId = mongoose.Types.ObjectId;

const app = express();
// body-parser middleware setup.  Will parse the JSON and convert to object
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '200mb' // Let us send the cool drawings to the database :)
}));
app.use(bodyParser.json({
    limit: '200mb' // Let us send the cool drawings to the frontend :)
}));
// Add express sesssion middleware
app.use(session({
    secret: 'oursecret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000,
        httpOnly: true
    }
}));
// Register Handlebars view engine
app.engine('hbs', exphbs({
    layoutsDir: __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/partials/',
    extname: '.hbs'
}));
// Use Handlebars view engine
app.set('view engine', 'hbs');

// Import the models
const { Student } = require('./models/student');
const { Teacher } = require('./models/teacher');
const { Session } = require('./models/session');

// Import the routes
const loginRoutes = require('./routes/login');
const adminRoutes = require('./routes/admin');
const mydrawingsRoutes = require('./routes/mydrawingsRoutes');
const mysessionsRoutes = require('./routes/mysessionsRoutes');
const newsessionRoutes = require('./routes/newsessionRoutes');
const registrationRoutes = require('./routes/registration');
const sketchbookRoutes = require('./routes/sketchbookRoutes');
const studentProfileRoutes = require('./routes/student_profile');
const teacherProfileRoutes = require('./routes/teacher_profile');
const studentSubmissionRoutes = require('./routes/student_submissions');
const teacherSubmissionRoutes = require('./routes/teacher_submissions');
const modifyStudentRoutes = require('./routes/modify_student');

// static assets directory
app.use("/assets", express.static(__dirname + '/public/assets'));

/* ----------------------- Register routes ----------------------- */
// Import my test routes into the path '/test' (https://stackoverflow.com/questions/6059246/how-to-include-route-handlers-in-multiple-files-in-express/37309212#37309212)
app.use('/login', loginRoutes);
app.use('/admin', adminRoutes);
app.use('/drawings', mydrawingsRoutes);
app.use('/sessions', mysessionsRoutes);
app.use('/newsession', newsessionRoutes);
app.use('/registration', registrationRoutes);
app.use('/sketchbook', sketchbookRoutes);
app.use('/student-profile', studentProfileRoutes);
app.use('/teacher-profile', teacherProfileRoutes);
app.use('/student-submissions', studentSubmissionRoutes);
app.use('/teacher-submissions', teacherSubmissionRoutes);
app.use('/modify-student', modifyStudentRoutes);

// About us
app.get('/about', (req, res) => {
    res.render("about", {
        layout: false,
        title: "Instasketch - About Us",
        authenticated: req.session.user ? true : false
    });
});



/* TODO:
*  Remove duplicate code from teacher/student submissions
*  Partition collection get routes into their own files
*/


/* Example try:
* Sample student object created to add to the db
* so that we can check our database exists and works.
*/
app.use("/newstudent", (req, res) => {
    const sampleStudent = new Student({
        first_name: "Luna",
        last_name: "Lovegood",
        school: "Hogwarts",
        teacher_id: "5c00964013cffc2289167eef",
        email: "luna.lovegood@hogwarts.com",
        password: "1234567",
        province: "London",
        path: "",
    });
    sampleStudent.save().then((result) => {
        res.send(result);
    }, (error) => {
        res.status(400).send(error);
    });
});

app.use("/newteacher", (req, res) => {
    const sampleTeacher = new Teacher({
        first_name: "Albus",
        last_name: "Dumbledore",
        school: "Hogwarts",
        email: "albus@hogwarts.com",
        password: "1234567",
        province: "London",
        teacher_code: "hellothere",
        path: "",
    });
    sampleTeacher.save().then((result) => {
        res.send(result);
    }, (error) => {
        res.status(400).send(error);
    });
});

app.use("/newsession", (req, res) => {
    const sampleSession = new Session({
        teacher_id: new ObjectId(),
		title: "new sesh",
		date: new Date(),
		marked_submissions: 5,
		total_submissions: 10,
		open: true
    });
    sampleSession.save().then((result) => {
        res.send(result);
    }, (error) => {
        res.status(400).send(error);
    });
});

app.get("/", (req, res) => {
	res.redirect("/login");
});

app.listen(port, () => {
    log(`Listening on port ${port}...`)
});
