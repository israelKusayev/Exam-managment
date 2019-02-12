const express = require('express');
const fs = require('fs');

const router = express.Router();

router.get('/', (req, res) => {
  fs.readdir('certificate-templates/', (err, files) => {
    if (err) {
      res.status(500).end();
      return;
    }

    files.forEach((file, i) => {
      files[i] = file.replace('.html', '');
    });
    res.status(200).send(files);
  });
});

module.exports = router;
