const express = require('express');
const answerManager = require('../db/answerManager');

const router = express.Router();

router.get('/:id', (req, res) => {
  answerManager.getAnswers(req.params.id, data => {
    if (data.error) res.status(500).end();
    else res.status(200).send(data);
  });
});

router.post('/', (req, res) => {
  const { testExecutionId, questionId, answers } = req.body;
  console.log({ testExecutionId, questionId, answers });
  answerManager.saveAnswers(testExecutionId, questionId, answers, data => {
    if (data && data.error) res.status(500).end();
    else res.status(200).send(data);
  });
});

module.exports = router;
