const express = require('express');
const fs = require('fs');
const path = require('path');
const uniqid = require('uniqid');

const router = express.Router();

// get the todo file
const todo_file = path.join(__dirname, '../todos.json');

/* GET todo list. */
router.get('/todos', (req, res, next) => {
  fs.readFile(todo_file, 'UTF-8', (error, data) => {
    if (error) return res.json( { error });
    console.log(data);
    res.json(JSON.parse(data));
  })
});

router.post('/todos', (req, res) => {
  console.log('req bodo', req.body);
  const id = uniqid.time();
  const new_todo = { todo: req.body.todo , done: false, id };
  fs.readFile(todo_file, async (error, data) => {
    try {
      if (error) await createNewTodoFile();
      // get all todos 
      const all_todos = JSON.parse(data);
      // then append the new one
      all_todos.push(new_todo); 
      // and write to file
      fs.writeFile(todo_file, JSON.stringify(all_todos), 'UTF-8', (error) => {
        if (error) return res.json({ error });
        res.json({ message : 'ok', new_todo });
      });
    } catch (error) {
      res.json ({ error });
    }
  });
});

router.put('/todos/:id', (req, res) => {
  const id = req.params.id;
  console.log('params', id);

  fs.readFile(todo_file, (error, data) => {
    if (error) return res.json({ err });
    // get all todos 
    const all_todos = JSON.parse(data);
    // then try to find the old todo for updating
    old_todo = all_todos.findIndex(todo => todo.id === id);

    // if old todo doesnt exist then create new one with the give id
    if (old_todo === -1) {
      all_todos.push({ todo: req.body.todo , done: false, id: id });
      console.log('didnt find it');
    }
    // if todo is found, then we update it
    else {
      all_todos[old_todo].done = !all_todos[old_todo].done;
      console.log('found it');
    }
    // and write to file
    fs.writeFile(todo_file, JSON.stringify(all_todos), 'UTF-8', (error) => {
      if (error) return res.json({ error });
      res.json({ message : 'ok' });
    })
  });
});

router.delete('/todos/:id', (req, res) => {
  const id = req.params.id;
  console.log('params', id);
  fs.readFile(todo_file, (error, data) => {
    if (error) return res.json({ err });
    // get all todos 
    const all_todos = JSON.parse(data);
    // then try to find the old todo for updating
    old_todo = all_todos.findIndex(todo => todo.id === id);

    // if old todo doesnt exist then create new one with the give id
    if (old_todo === -1) {
      console.log('didnt find it');
      return res.json( { message: 'didnt find it'});
    }
    // if todo is found, then we update it
    else {
      all_todos.splice(old_todo, 1);
      console.log('found it');
    }
    // and write to file
    fs.writeFile(todo_file, JSON.stringify(all_todos), 'UTF-8', (error) => {
      if (error) return res.json({ error });
      res.json({ message : 'ok' });
    })
  });
});

function createNewTodoFile() {
  fs.writeFile(todo_file, "[]", error => error);
}

module.exports = router;
