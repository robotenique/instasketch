const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send("Admin page here");
});

module.exports = router;
