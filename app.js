const express = require('express');
const path = require('path');
const logger = require('morgan');

// import database
const sequelize = require('./database/orm');

// import route
const todosRouter = require('./routes/todos');

const app = express();

// check if we can connect to db
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// sync DB
sequelize.sync();

// Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api', todosRouter);


module.exports = app;
