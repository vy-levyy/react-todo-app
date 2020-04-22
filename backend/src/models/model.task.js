module.exports = (sequelize, Sequelize) => {
  const Task = sequelize.define('task', {
    description: {
      type: Sequelize.STRING
    },
    isDone: {
      type: Sequelize.BOOLEAN
    }
  });
  
  return Task;
}