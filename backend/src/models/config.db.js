const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD, {
  dialect: process.env.DB_DIALECT,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  logging: false,
  define: {
      timestamps: false
  }
});

sequelize
  .authenticate()
  .then(() => console.log('Connected'))
  .catch(err => console.error('Connection error: ', err))

const User = require('./model.user.js')(sequelize, Sequelize);
const Task = require('./model.task.js')(sequelize, Sequelize);

User.hasMany(Task);
Task.belongsTo(User);

User.sync();
Task.sync();

const db = {
  Sequelize,
  sequelize,
  User,
  Task
}

module.exports = db;
