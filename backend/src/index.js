require('dotenv').config();
const mysql = require('mysql2');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// const router = require('./routes/router.js');
// const controller = require('./controllers/controller');
  
const urlencodedParser = bodyParser.urlencoded({extended: false});
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});


app.use(express.json());


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env.ORIGIN);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});


// app.use('/task_list', router);
app.get('/task_list', (req, res) => {
  connection.query(
    `SELECT
      task_id AS id,
      task_description AS description,
      done AS isDone
    FROM todo.tasks
    WHERE user_id = ${req.query.userId}`,
    (err, results) => {
      if(err) return console.log(err);
      res.send(results);
    }
  );
});


app.post('/create_task', urlencodedParser, function(req, res) {
  //if(!req.body) return res.sendStatus(400);

  connection.query(
    `INSERT INTO todo.tasks (user_id, task_description, done)
    VALUE (?, ?, false)`,
    [req.body.userId, req.body.taskDescription],
    function(err, results) {
      if(err) return console.log(err);
      res.send(results);
  });
});


app.delete('/delete_task', function(req, res) {
  connection.query(
    `DELETE FROM todo.tasks
    WHERE user_id = ${req.query.userId} AND task_id = ${req.query.taskId}`,
    function(err, results) {
      if(err) return console.log(err);
      res.send(results);
  });
});


app.put('/change_task_mark', urlencodedParser, function(req, res) {
  connection.query(
    `UPDATE todo.tasks SET done = ${req.body.isDone}
    WHERE user_id = ${req.body.userId} and task_id = ${req.body.taskId}`,
    function(err, results) {
      if(err) return console.log(err);
      res.send(results);
  });
});


app.delete('/delete_completed_tasks', function(req, res) {
  connection.query(
    `DELETE from todo.tasks
    WHERE user_id = ${req.query.userId} AND task_id in (${req.query.taskIds.join(', ')})`,
    function(err, results) {
      if(err) return console.log(err);
      res.send(results);
  });
});


app.put('/change_all_task_marks', urlencodedParser, function(req, res) {
  connection.query(
    `UPDATE todo.tasks SET done = ${req.body.isDone}
    WHERE user_id = ${req.body.userId}`,
    function(err, results) {
      if(err) return console.log(err);
      res.send(results);
  });
});


app.put('/change_task_description', urlencodedParser, function(req, res) {
  console.log(req.body.taskDescription);
  console.log(req.body.userId);
  console.log(req.body.taskId);
  connection.query(
    `UPDATE todo.tasks SET task_description = ${req.body.taskDescription}
    WHERE user_id = ${req.body.userId} AND task_id = ${req.body.taskId}`,
    function(err, results) {
      if(err) {
        console.log('///////////////////');
        return console.log(err);
      }
      res.send(results);
  });
});



connection.connect(function(err){
  if (err) {
    return console.error("Ошибка: " + err.message);
  }
  else{
    console.log("Подключение к серверу MySQL успешно установлено");
  }
});

app.listen(process.env.PORT, function(){
  console.log("Сервер ожидает подключения...");
});
