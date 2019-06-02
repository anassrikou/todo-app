const { DataTypes } = require('sequelize');
const sequelize = require('../database/orm');

const Todo = sequelize.define('todo', {
	todo:  {
		type: DataTypes.STRING
	},
	done: {
		type: DataTypes.BOOLEAN,
		defaultValue: false
	}
});

module.exports = Todo;