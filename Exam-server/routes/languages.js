const express = require('express');
const languagesRepository = require('../db/languagesManager');
const router = express.Router();

router.get('/', (req, res) => {
  languagesRepository.getLanguages(data => {
    res.send(data);
  });
});

module.exports = router;
