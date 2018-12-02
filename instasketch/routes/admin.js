const express = require('express');
const router = express.Router();
const authenticateTeacher = require('./sessionAuth').authenticateTeacher;

router.get('/', authenticateTeacher, (req, res) => {
  res.render('admin', {layout: 'adminLayout'});
});

router.post('/', authenticateTeacher, (req, res) => {

});

module.exports = router;
