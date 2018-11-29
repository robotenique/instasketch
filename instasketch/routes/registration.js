const express = require('express');
const router = express.Router();
const { Student } = require('../models/student');

/*
 * Example try: GET will return all the students objects
 * in our database and present it to the browser
 * at localhost:3000/registration
 */
router.get('/', (req, res) => {
  Student.find().then((students) => {
    res.send({students}) //put in object in case we want to add other properties
  }, (error) => {
    res.status(400).send(error)
  })
});

module.exports = router;
