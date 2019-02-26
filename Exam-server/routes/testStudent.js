const express = require('express');
const testStudentRepository = require('../db/testStudentManager');

const router = express.Router();

router.get('/:testId/:userId', (req, res) => {
  testStudentRepository.getStudentTest(
    +req.params.testId,
    req.params.userId,
    data => {
      console.log(data);
      if (data && data.error) {
        res.status(500).end();
        return;
      }
      res.status(200).send(data);
    }
  );
});

router.get('/get-grade/:testId/:testExecId', (req, res) => {
  const { testId, testExecId } = req.params;
  testStudentRepository.calcGrade(testId, testExecId, data => {
    if (data && data.error) {
      res.status(500).end();
    } else {
      res.status(200).send(data);
    }
  });
});

router.post('/', (req, res) => {
  const { testId, userId } = req.query;

  testStudentRepository.craeteTestExecution(testId, userId, data => {
    if (data.error) {
      res.status(500).end();
    }
    res.status(200).send(data);
  });
});

module.exports = router;
