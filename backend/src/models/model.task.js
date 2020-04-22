module.exports = (sequelize, Sequelize) => {
  const Task = sequelize.define('task', {
    description: {
      type: Sequelize.STRING
    },
    is_done: {
      type: Sequelize.BOOLEAN
    }
  });
  
  return Task;
}