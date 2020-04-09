const mysql = require('mysql2');

module.exports = () => {
  mysql.createQuery(`INSERT INTO todo.data(user_id, task_list) VALUES (3, 'task3')`);
}