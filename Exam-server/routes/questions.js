const express = require('express');
const questionManager = require('../db/questionsManager');
const authorize = require('../middlewares/authorize');

const router = express.Router();

router.get('/', authorize.admin, (req, res) => {
  console.log('get');
  if (req.query.subjectId) {
    questionManager.getQuestions(req.query.subjectId, data => {
      if (data.error) res.status(500).end();
      else {
        let questions = [];
        for (let i = 0; i < data.length; i++) {
          questions.push({
            id: data[i].Id,
            title: data[i].Title,
            textBelow: data[i].TextBelow,
            multipleChoice: data[i].MultipleChoice,
            tags: data[i].Tags,
            horizontalDisplay: data[i].HorizontalDisplay,
            isActive: data[i].IsActive,
            lastUpdate: data[i].LastUpdate,
            testCount: data[i].TestCount
          });
        }
        res.status(200).send(questions);
      }
    });
  } else {
    res.status(400).send({ message: 'No subject id was supplied' });
  }
});

router.get('/:id', authorize.admin, (req, res) => {
  if (!Number.isInteger(parseInt(req.params.id))) {
    res.status(400).send({ message: 'invalid id' });
    return;
  }
  questionManager.getQuestionById(req.params.id, data => {
    if (data && data[0]) {
      questionManager.getQuestionPossibleAnswers(
        req.params.id,
        possibleAnswers => {
          if (possibleAnswers) {
            res.status(200).send({
              subjectId: data[0].SubjectId,
              title: data[0].Title,
              possibleAnswers: possibleAnswers.map(possibleAnswer => ({
                correct: possibleAnswer.IsCorrect,
                title: possibleAnswer.Title
              })),
              textBelow: data[0].TextBelow,
              multipleChoice: data[0].MultipleChoice,
              tags: data[0].Tags,
              horizontalDisplay: data[0].HorizontalDisplay,
              isActive: data[0].IsActive,
              lastUpdate: data[0].LastUpdate
            });
          } else {
            res.status(500).end();
          }
        }
      );
    } else res.status(500).end();
  });
});

router.put('/:questionId', authorize.admin, (req, res) => {
  const possibleAnswers = req.body.possibleAnswers;
  questionManager.updateQuestion(
    req.params.questionId,
    possibleAnswers,
    req.body.title,
    req.body.textBelow,
    req.body.multipleChoice,
    req.body.tags,
    req.body.horizontalDisplay,
    data => {
      if (data && data.error) {
        res.status(400).end();
      } else {
        res.status(200).send();
      }
    }
  );
});

router.post('/', authorize.admin, (req, res) => {
  const possibleAnswers = req.body.possibleAnswers;

  for (let i = 0; i < possibleAnswers.length; i++) {
    if (!req.body.multipleChoice) {
      possibleAnswers[i].correct = req.body.answer === i;
    }
  }
  questionManager.addQuestion(
    req.body.subjectId,
    possibleAnswers,
    req.body.title,
    req.body.textBelowQuestion,
    req.body.multipleChoice,
    req.body.tags,
    req.body.horizontalDisplay,
    data => {
      if (data && data.error) {
        res.status(400).end();
      } else {
        res.status(200).send();
      }
    }
  );
});

router.delete('/:id', (req, res) => {
  questionManager.deleteQuestion(req.params.id, data => {
    if (data && data.error) {
      res.status(500).end();
      return;
    }
    res.status(200).end();
  });
});

module.exports = router;
