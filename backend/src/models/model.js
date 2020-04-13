const mysql = require('mysql2');


const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
}).promise();



exports.task_list = (userId) => {
  return connection.query(`
    SELECT
      task_id AS id,
      task_description AS description,
      done AS isDone
    FROM todo.tasks
    WHERE user_id = ${userId}
  `);
};


exports.create_task = (userId, taskDescription) => {
  const sql = `
    INSERT INTO todo.tasks (user_id, task_description, done)
    VALUE (?, ?, false)
  `;

  return connection.query(sql, [userId, taskDescription]);
}


exports.delete_task = (userId, taskId) => {
  return connection.query(`
    DELETE FROM todo.tasks
    WHERE user_id = ${userId} AND task_id = ${taskId}
  `);
}


exports.change_task_mark = (userId, taskId, isDone) => {
  return connection.query(`
    UPDATE todo.tasks SET done = ${isDone}
    WHERE user_id = ${userId} and task_id = ${taskId}
  `);
}


exports.delete_completed_tasks = (userId, taskIds) => {
  return connection.query(`
    DELETE from todo.tasks
    WHERE user_id = ${userId} AND task_id in (${taskIds.join(', ')})
  `);
}


exports.change_all_task_marks = (userId, isDone) => {
  return connection.query(`
    UPDATE todo.tasks SET done = ${isDone}
    WHERE user_id = ${userId}
  `);
}


exports.change_task_description = (userId, taskId, taskDescription) => {
  return connection.query(`
    UPDATE todo.tasks SET task_description = '${taskDescription}'
    WHERE user_id = ${userId} AND task_id = ${taskId}
  `);
}
