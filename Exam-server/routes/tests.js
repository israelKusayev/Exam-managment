const express = require('express');
const validator = require('../validators/test.Validator');
const testsManager = require('../db/testsManager');
const router = express.Router();

router.get('/:testId/:userId', (req, res) => {
  testsManager.getStudentTest(+req.params.testId, req.params.userId, data => {
    console.log(data);
    if (data && data.error) {
      res.status(500).end();
      return;
    }
    res.status(200).send(data);
  });
});

router.get('/:id', (req, res) => {
  if (!Number.isInteger(parseInt(req.params.id))) {
    res.status(400).send({ message: 'invalid id' });
    return;
  }
  testsManager.getTest(req.params.id, data => {
    if (data) {
      if (data.error) {
        res.status(500).end();
        return;
      }
      res.status(200).send(data);
    } else {
      res.status(400).send('test not found');
    }
  });
});

router.get('/', (req, res) => {
  if (!req.query.subjectId) {
    res.status(400).send({ message: 'subject id was not supplied' });
  }
  testsManager.getTests(req.query.subjectId, data => {
    if (data.error) {
      res.status(500).end();
      return;
    }
    res.status(200).send(data);
  });
});

router.post('/', async (req, res) => {
  try {
    await validator.validateCreateTest(req.body.details);
  } catch (error) {
    res.status(400).send({ message: error.details[0].message });
    return;
  }
  testsManager.createTest(req.body, data => {
    if (data && data.error) {
      res.status(500).end();
    }
    res.status(200).end();
  });
});

router.put('/:id', async (req, res) => {
  try {
    await validator.validateCreateTest(req.body.details);
  } catch (error) {
    res.status(400).send({ message: error.details[0].message });
    return;
  }
  testsManager.updateTest(req.params.id, req.body, data => {
    if (data && data.error) {
      res.status(500).end();
      return;
    }
    res.status(200).end();
  });
});

router.delete('/:id', (req, res) => {
  testsManager.deleteTest(req.params.id, data => {
    console.log(data);
    if (data && data.error) {
      res.status(500).end();
      return;
    }
    res.status(200).end();
  });
});

module.exports = router;
