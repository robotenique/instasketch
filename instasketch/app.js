'use strict';

const log = console.log;
const express = require('express');
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser'); // middleware for parsing HTTP body from client
const { ObjectID } = require('mongodb');

// Import our mongoose connection
// Currently inside /models folder
const { mongoose } = require('./models/mongoose');

const app = express();
// body-parser middleware setup.  Will parse the JSON and convert to object
app.use(bodyParser.json());



// Import the models
const { User } = require('./models/user');
const { Student } = require('./models/student');
const { Teacher } = require('./models/teacher');

// Import the routes
const testRoutes = require('./routes/tests');
const loginRoutes = require('./routes/login');
const adminRoutes = require('./routes/admin');
const registrationRoutes = require('./routes/registration');
/* ----------------------- Register routes ----------------------- */
// Import my test routes into the path '/test' (https://stackoverflow.com/questions/6059246/how-to-include-route-handlers-in-multiple-files-in-express/37309212#37309212)
app.use('/tests', testRoutes);
app.use('/login', loginRoutes);
app.use('/admin', adminRoutes);
app.use('/registration', registrationRoutes);

/* Example try:
 * Sample student object created to add to the db
 * so that we can check our database exists and works.
 */
const sampleStudent = new Student({
  first_name: "Harry",
  last_name: "Potter",
  school: "Hogwarts",
  teacher_id: "",
  email: "harry.potter@hogwarts.com",
  password: "12345",
  province: "London",
  path: "",
});

sampleStudent.save().then((result) => {
  res.send(result);
}, (error) => {
  res.status(400).send(error);
});

app.listen(port, () => {
    log(`Listening on port ${port}...`)
});
