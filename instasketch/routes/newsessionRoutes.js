const express = require('express');
const authenticateTeacher = require('./sessionAuth').authenticateTeacher;
router = express.Router();

router.get('/', authenticateTeacher, (req, res) => {
    res.render('newsession', {layout: 'newsessionLayout'});
})

module.exports = router;
