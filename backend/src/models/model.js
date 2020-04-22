const {
  sequelize,
  Sequelize: { QueryTypes, Op },
  User,
  Task
} = require('./config.db');

exports.find_user = (email) => {
  return User.findOne({ where: { email } });
}

exports.signup = (email, password) => {
  return User.create({ email, password });
}

exports.signin = (email) => {
  return this.find_user(email);
}

exports.task_list = (userId) => {
  return Task.findAll({ where: { userId } });
};

exports.create_task = (userId, taskDescription) => {
  return Task.create({
    userId,
    description: taskDescription,
    isDone: false
  });
}

exports.delete_task = (userId, taskId) => {
  return Task.destroy({
    where: {
      userId,
      id: taskId
    }
  });
}

exports.change_task_mark = async (userId, taskId, isDone) => {
  const task = await Task.findOne({ 
    where: {
      userId,
      id: taskId
    }
  });

  task.isDone = isDone;
  await task.save();

  return task;
}

exports.delete_completed_tasks = (userId, taskIds) => {
  return Task.destroy({
    where: {
      userId,
      id: {
        [Op.in]: taskIds
      }
    }
  });
}

exports.change_all_task_marks = async (userId, isDone) => {
  return sequelize.query(`
    UPDATE todo.tasks SET isDone = ${isDone}
    WHERE userId = ${userId}
  `, {
    raw: true,
    type: QueryTypes.UPDATE
  });
  // const tasks = await Task.findAll({ 
  //   where: {
  //     userId
  //   }
  // });

  // tasks.map(async (task) => {
  //   task.isDone = isDone;
  //   await task.save();
  // });

  // return tasks;
}

exports.change_task_description = async (userId, taskId, taskDescription) => {
  const task = await Task.findOne({ 
    where: {
      userId,
      id: taskId
    }
  });

  task.description = taskDescription;
  await task.save();

  return task;
}
