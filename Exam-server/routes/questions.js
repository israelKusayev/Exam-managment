const express = require('express');
const questionManager = require('../db/questionsManager');

const router = express.Router();

router.get('/', (req, res) => {
  console.log('get');

  questionManager.getQuestions(data => {
    if (data.error) res.status(500).end();
    else res.status(200).send(data);
  });
});

module.exports = router;
