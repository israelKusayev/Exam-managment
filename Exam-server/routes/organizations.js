const express = require('express');
const organizationsManager = require('../db/organizationsManager');

const router = express.Router();

router.get('/:adminEmail', (req, res) => {
  organizationsManager.getOrganizations(req.params.adminEmail, data => {
    if (data.error) {
      res.status(500).end();
      return;
    }

    res.status(200).send(data);
  });
});

module.exports = router;
