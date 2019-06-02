const Sequelize = require('sequelize');

// init DB connection
const sequelize = new Sequelize({
	dialect: 'sqlite',
	storage: 'db.sqlite'
});

module.exports = sequelize;
