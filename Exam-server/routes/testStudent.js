const express = require('express');
const testStudentRepository = require('../db/testStudentManager');

const router = express.Router();

router.get('/finish-test-execution/:testExecutionId', (req, res) => {
  testStudentRepository.finishTestExecution(
    req.params.testExecutionId,
    data => {
      if (data && data[0])
        res.status(200).send({
          grade: data[0].Grade,
          numOfCorrectAnswers: data[0].NumOfCorrectAnswers,
          numOfTestQuestions: data[0].NumOfTestQuestions,
          numOfQuestionsAnswered: data[0].NumOfQuestionsAnswered,
          passingGrade: data[0].PassingGrade,
          showAnswers: data[0].ShowAnswers
        });
    }
  );
});

router.get('/test-execution-results/:testExecutionId', (req, res) => {
  testStudentRepository.getTestExecutionResults(
    req.params.testExecutionId,
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
