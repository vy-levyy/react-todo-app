const connection = require('./mysqlConnection');

exports.task_list = (userId) => {
  return connection.query(`
    SELECT
      task_id AS id,
      task_description AS description,
      done AS isDone
    FROM todo.tasks
    WHERE user_id = ?
  `, [userId]);
};

exports.create_task = (userId, taskDescription) => {
  return connection.query(`
    INSERT INTO todo.tasks (user_id, task_description, done)
    VALUE (?, ?, false)
  `, [userId, taskDescription]);
}

exports.delete_task = (userId, taskId) => {
  return connection.query(`
    DELETE FROM todo.tasks
    WHERE user_id = ? AND task_id = ?
  `,[userId, taskId]);
}

exports.change_task_mark = (userId, taskId, isDone) => {
  return connection.query(`
    UPDATE todo.tasks SET done = ?
    WHERE user_id = ? and task_id = ?
  `, [isDone, userId, taskId]);
}

exports.delete_completed_tasks = (userId, taskIds) => {
  return connection.query(`
    DELETE from todo.tasks
    WHERE user_id = ? AND task_id in (?)
  `, [userId, taskIds]);
}

exports.change_all_task_marks = (userId, isDone) => {
  return connection.query(`
    UPDATE todo.tasks SET done = ?
    WHERE user_id = ?
  `,[isDone, userId]);
}

exports.change_task_description = (userId, taskId, taskDescription) => {
  return connection.query(`
    UPDATE todo.tasks SET task_description = ?
    WHERE user_id = ? AND task_id = ?
  `, [taskDescription, userId, taskId]);
}
