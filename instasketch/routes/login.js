const express = require('express');
const router = express.Router();
const session = require('express-session');

const sessionChecker = (req, res, next) => {
  if (req.session.teacher_id) {
    res.redirect('/sketchbook');
  } else if (req.session.teacher_code) {
    res.redirect('/admin');
  } else {
    next();
  }
}

router.get('/', sessionChecker, (req, res) => {
  res.render("login", {layout: 'loginLayout', title: 'Instasketch - login'});
});

module.exports = router;
