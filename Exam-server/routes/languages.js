const express = require('express');
const languagesRepository = require('../db/languagesManager');
const authrize=require('../middlewares/authorize');
const router = express.Router();

router.get('/',authrize.admin, (req, res) => {
  languagesRepository.getLanguages(data => {
    if (data.error) {
      res.status(500).end();
    }
    res.status(200).send(data);
  });
});

module.exports = router;
