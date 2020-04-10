const mysql = require('mysql2');

module.exports = (res, userId) => {
  mysql.createQuery(
    `SELECT
      task_id AS id,
      task_description AS description,
      done AS isDone
    FROM todo.tasks
    WHERE user_id = ${userId}`,
    (err, results) => { res.send(results); }
  );
}