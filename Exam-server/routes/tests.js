const express = require('express');
const validator = require('../validators/test.Validator');
const testsManager = require('../db/testsManager');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('tests');
});

router.post('/', async (req, res) => {
  try {
    await validator.validateCreateTest(req.body);
  } catch (error) {
    res.status(400).send({ message: error.details[0].message });
    return;
  }
  console.log(req.body);
  testsManager.createTest(req.body, data => {
    if (data.error) {
      res.status(500).end();
    }
    res.status(200).send(data);
  });

  res.status(200).send({ tt: 'tests' });
});

module.exports = router;
