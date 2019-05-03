const express = require('express');
const { appendFile } = require('fs');
const path = require('path');

const router = express.Router();
const file = path.join(__dirname, 'todolist.txt');

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

router.post('/', (req, res) => {
  console.log(req.body);
  appendFile(file, req.body.todo, f => console.log(f));
  res.json({ message : 'ok' });
});

module.exports = router;
