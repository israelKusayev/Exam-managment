const express = require('express');
const subjectManager = require('../db/subjectsManager');

const router = express.Router();

router.get('/:organizationId', (req, res) => {
  subjectManager.getSubjects(req.params.organizationId, data => {
    if (data.error) {
      res.status(500).end();
      return;
    }
    res.status(200).send(data);
  });
});

module.exports = router;
