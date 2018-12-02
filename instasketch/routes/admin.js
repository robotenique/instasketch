const express = require('express');
const router = express.Router();
const authenticateTeacher = require('./sessionAuth').authenticateTeacher;
const { ObjectID } = require('mongodb');
const { Student } = require('../models/student');

router.get('/', authenticateTeacher, (req, res) => {
  res.render('admin', {layout: 'adminLayout'});
});

router.post('/', authenticateTeacher, (req, res) => {

});

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
