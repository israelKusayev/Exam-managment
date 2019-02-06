const express = require('express');

const router = express.Router();

router.delete('/:id', (req, res) => {
  const id = req.params['id'];
  db.deleteQustion(id, success => {
    if (success) {
      res.status(200).send('question deleted successsfully');
      return;
    }
    res.status(400).end();
  });
});

module.exports = router;
