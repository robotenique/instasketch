'use strict';

const log = console.log;
const express = require('express');
const port = process.env.PORT || 3000;
const session = require('express-session'); // To store user sessions
const bodyParser = require('body-parser'); // middleware for parsing HTTP body from client
const exphbs = require('express-handlebars'); // Handle the views
const { ObjectID } = require('mongodb');

// Import our mongoose connection
// Currently inside /models folder
const { mongoose } = require('./models/mongoose');

const app = express();
// body-parser middleware setup.  Will parse the JSON and convert to object
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
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



// Add middleware to check for logged-in users
const sessionChecker = (req, res, next) => {
    /*   if (req.session.user) {
        res.redirect('/dashboard')
    } else {
        next();
    }
    */
    // TODO: currently I'm allowing all users (for testing purposes :D)
    next();
}



// Import the models
const { User } = require('./models/user');
const { Student } = require('./models/student');
const { Teacher } = require('./models/teacher');

// Import the routes
const testRoutes = require('./routes/tests');
const loginRoutes = require('./routes/login');
const adminRoutes = require('./routes/admin');
const registrationRoutes = require('./routes/registration');
const sketchbookRoutes = require('./routes/sketchbookRoutes.js');

// static assets directory
app.use("/assets", express.static(__dirname + '/public/assets'));

/* ----------------------- Register routes ----------------------- */
// Import my test routes into the path '/test' (https://stackoverflow.com/questions/6059246/how-to-include-route-handlers-in-multiple-files-in-express/37309212#37309212)
app.use('/tests', testRoutes);
app.use('/login', loginRoutes);
app.use('/admin', adminRoutes);
app.use('/registration', registrationRoutes);
app.use('/sketchbook', sketchbookRoutes);

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
        password: "12345",
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
        password: "12345",
        province: "London",
        path: "",
    });
    sampleTeacher.save().then((result) => {
        res.send(result);
    }, (error) => {
        res.status(400).send(error);
    });
});



app.listen(port, () => {
    log(`Listening on port ${port}...`)
});
