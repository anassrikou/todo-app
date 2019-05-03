const express = require('express');

const router = express.Router();
const todolist = [];

/* GET users listing. */
router.get('/todos', (req, res, next) => {
  res.json(todolist);
});

router.post('/todos', (req, res) => {
  console.log(req.body);
  todolist.push(req.body);  
  console.log(todolist);
  res.json({ message : 'ok' });
});

router.put('/todos/:id', (req, res) => {
  res.json({ 'update': 'ok' });
});

router.delete('/todos/:id', (req, res) => {
  res.json({ 'deleted': 'ok' });
})

module.exports = router;
