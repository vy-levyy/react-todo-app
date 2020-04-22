const { sequelize, Sequelize: { QueryTypes } } = require('./config.db');

exports.task_list = (userId) => {
  return sequelize.query(`
    SELECT id, description, is_done AS isDone
    FROM todo.tasks
    WHERE userId = ${userId}
  `, {
    raw: true,
    type: QueryTypes.SELECT
  });
};

exports.create_task = (userId, taskDescription) => {
  // console.log(userId)
  return sequelize.query(`
    INSERT INTO todo.tasks (userId, description, is_done)
    VALUE ('${userId}', '${taskDescription}', false)
  `, {
    raw: true,
    type: QueryTypes.INSERT
  });
}

exports.delete_task = (userId, taskId) => {
  return sequelize.query(`
    DELETE FROM todo.tasks
    WHERE userId = ${userId} AND id = ${taskId}
  `, {
    raw: true,
    type: QueryTypes.DELETE
  });
}

exports.change_task_mark = (userId, taskId, isDone) => {
  return sequelize.query(`
    UPDATE todo.tasks SET is_done = ${isDone}
    WHERE userId = ${userId} AND id = ${taskId}
  `, {
    raw: true,
    type: QueryTypes.UPDATE
  });
}

exports.delete_completed_tasks = (userId, taskIds) => {
  return sequelize.query(`
    DELETE from todo.tasks
    WHERE userId = ${userId} AND id in (${taskIds})
  `, {
    raw: true,
    type: QueryTypes.DELETE
  });
}

exports.change_all_task_marks = (userId, isDone) => {
  return sequelize.query(`
    UPDATE todo.tasks SET is_done = ${isDone}
    WHERE userId = ${userId}
  `, {
    raw: true,
    type: QueryTypes.UPDATE
  });
}

exports.change_task_description = (userId, taskId, taskDescription) => {
  return sequelize.query(`
    UPDATE todo.tasks SET description = '${taskDescription}'
    WHERE userId = ${userId} AND id = ${taskId}
  `, {
    raw: true,
    type: QueryTypes.UPDATE
  });
}
