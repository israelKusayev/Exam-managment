const express = require('express');

const router = express.Router();

router.delete('/:id', (req, res) => {
  const id = req.params['id'];
  db.deleteQustion(id, success => {
    if (success) {
      res.status(200).send('question deleted successsfully');
    } else {
      res.status(400).send({ message: '' });
    }
  });
});

module.exports = router;
