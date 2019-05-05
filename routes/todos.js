const express = require('express');
const fs = require('fs');
const path = require('path');
const uniqid = require('uniqid');

const router = express.Router();

// get the todo file
const todo_file = path.join(__dirname, '../todos.json');

/* GET users listing. */
router.get('/todos', (req, res, next) => {
  fs.readFile(todo_file, 'UTF-8', (error, data) => {
    if (error) return res.json( { error });
    console.log(data);
    res.json(JSON.parse(data));
  })
});

router.post('/todos', (req, res) => {
  console.log(req.body);
  const id = uniqid.time();
  const new_todo = { ...req.body, id };
  fs.readFile(todo_file, async (error, data) => {
    if (error) await createNewTodoFile();
    // get all todos 
    const all_todos = JSON.parse(data);
    // then append the new one
    all_todos.push(new_todo); 
    // and write to file
    fs.writeFile(todo_file, JSON.stringify(all_todos), 'UTF-8', (error) => {
      if (error) return res.json({ error });
      res.json({ message : 'ok' });
    })
  }) ;
});

router.put('/todos/:id', (req, res) => {
  res.json({ 'update': 'ok' });
});

router.delete('/todos/:id', (req, res) => {
  res.json({ 'deleted': 'ok' });
});

function createNewTodoFile() {
  fs.writeFile(todo_file, "[]", error => error);
}

module.exports = router;
