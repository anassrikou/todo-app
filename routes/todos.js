const express = require('express');
const Todo = require('../models/todo');

const router = express.Router();

/* GET todo list. */
router.get('/todos', (req, res) => {
  Todo
  .findAll()
  .then(data => res.json({ data }))
  .catch(error => res.json({ error }));
});

router.post('/todos', (req, res) => {
  console.log('req bodo', req.body);
  const new_todo = { todo: req.body.todo };

  Todo
    .create(new_todo)
    .then(data => res.json({ message: 'success', data }))
    .catch(error => res.json({ error }));
});

router.put('/todos/:id', (req, res) => {
  const id = req.params.id;
  console.log('params', id);

  Todo
    .findByPk(id)
    .then(todo => {
      todo.update({ todo: req.body.todo, done: !todo.done })
        .then(data => res.json({ message: 'success', data }));
    })
    .catch(error => res.json({ error }));
});

router.delete('/todos/:id', (req, res) => {
  const id = req.params.id;
  console.log('params', id);
  Todo
    .destroy({ where: {id: id }})
    .then(data => res.json({ message: 'success', data }))
    .catch(error => res.json({ error }));
});

module.exports = router;
