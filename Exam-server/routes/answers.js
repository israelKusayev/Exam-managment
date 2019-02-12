const express = require('express');
const answerManager = require('../db/answerManager');

const router = express.Router();

router.get('/:id', (req, res) => {
  answerManager.getAnswers(req.params.id, data => {
    if (data.error) res.status(500).end();
    else res.status(200).send(data);
  });
});

module.exports = router;
