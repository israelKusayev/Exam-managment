const express = require('express');
const languagesRepository = require('../db/languagesManager');
const router = express.Router();

router.get('/', (req, res) => {
  languagesRepository.getLanguages(data => {
    if (data.error) {
      res.status(500).end();
    }
    res.status(200).send(data);
  });
});

module.exports = router;
