const express = require('express');
const testsManager = require('../db/testsManager');
const router = express.Router();

router.get('/', async (req, res) => {
  res.send('tests');
});

router.post('/', async (req, res) => {
  testsManager.createTest();
  res.send('tests');
});

module.exports = router;
