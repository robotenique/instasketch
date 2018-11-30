const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {

  res.render("login", {layout: 'loginLayout', title: 'Instasketch - login'});
});

module.exports = router;
