require('dotenv').config();
const mysql = require('mysql2');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Joi = require('@hapi/joi');
const joiSchemas = require('./joiSchemas');
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

app.set('port', process.env.PORT || 3000);

app.use(express.json());


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env.ORIGIN);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});



// app.use('/task_list', router);
app.get('/task_list', (req, res) => {
  const { error, value } = joiSchemas.userId.validate(req.query.userId);

  if (error) {
    console.log(error.details[0].message);
    return res.status(400).send(error.details[0].message);
  }

  const sql = `
    SELECT
      task_id AS id,
      task_description AS description,
      done AS isDone
    FROM todo.tasks
    WHERE user_id = ${value}
  `;

  connection.query(sql, (err, results) => {
    if (err) {
      return console.log(err);
    }

    if (results.length !== 0) {
      res.send(results);
    } else {
      res.sendStatus(404);
    }
  });
});


app.post('/create_task', urlencodedParser, (req, res) => {
  const schema = Joi.object({
    userId: joiSchemas.userId,
    taskDescription: joiSchemas.taskDescription
  });
  const { error, value } = schema.validate(req.body);

  if (error) {
    console.log(error.details[0].message);
    return res.status(400).send(error.details[0].message);
  }

  const sql = `
    INSERT INTO todo.tasks (user_id, task_description, done)
    VALUE (?, ?, false)
  `;

  connection.query(
    sql,
    [value.userId, value.taskDescription],
    (err, results) => {
      if (err) return console.log(err);
      res.send(results);
  });
});


app.delete('/delete_task', (req, res) => {
  const schema = Joi.object({
    userId: joiSchemas.userId,
    taskId: joiSchemas.taskId
  });
  const {error, value} = schema.validate(req.query);

  if (error) {
    console.log(error.details[0].message);
    return res.status(400).send(error.details[0].message);
  }

  const sql = `
    DELETE FROM todo.tasks
    WHERE user_id = ${value.userId} AND task_id = ${value.taskId}
  `;

  connection.query(sql, (err, results) => {
    if (err) return console.log(err);
    res.send(results);
  });
});


app.put('/change_task_mark', urlencodedParser, (req, res) => {
  const schema = Joi.object({
    userId: joiSchemas.userId,
    taskId: joiSchemas.taskId,
    isDone: joiSchemas.isDone
  });

  const {error, value} = schema.validate(req.body);

  if (error) {
    console.log(error.details[0].message);
    return res.status(400).send(error.details[0].message);
  }

  const sql = `
    UPDATE todo.tasks SET done = ${value.isDone}
    WHERE user_id = ${value.userId} and task_id = ${value.taskId}
  `;

  connection.query(sql, (err, results) => {
    if (err) return console.log(err);
    res.send(results);
  });
});


app.delete('/delete_completed_tasks', (req, res) => {
  const schema = Joi.object({
    userId: joiSchemas.userId,
    taskIds: joiSchemas.taskIds
  });
  const {error, value} = schema.validate(req.query);

  if (error) {
    console.log(error.details[0].message);
    return res.status(400).send(error.details[0].message);
  }

  const sql = `
    DELETE from todo.tasks
    WHERE user_id = ${value.userId} AND task_id in (${value.taskIds.join(', ')})
  `;

  connection.query(sql, (err, results) => {
    if (err) return console.log(err);
    res.send(results);
  });
});


app.put('/change_all_task_marks', urlencodedParser, (req, res) => {
  const schema = Joi.object({
    userId: joiSchemas.userId,
    isDone: joiSchemas.isDone
  });
  const {error, value} = schema.validate(req.body);

  if (error) {
    console.log(error.details[0].message);
    return res.status(400).send(error.details[0].message);
  }

  const sql = `
    UPDATE todo.tasks SET done = ${value.isDone}
    WHERE user_id = ${value.userId}
  `;

  connection.query(sql, (err, results) => {
    if(err) return console.log(err);
    res.send(results);
  });
});


app.put('/change_task_description', urlencodedParser, (req, res) => {
  const schema = Joi.object({
    userId: joiSchemas.userId,
    taskId: joiSchemas.taskId,
    taskDescription: joiSchemas.taskDescription
  });
  const {error, value} = schema.validate(req.body);

  if (error) {
    console.log(error.details[0].message);
    return res.status(400).send(error.details[0].message);
  }

  const sql = `
    UPDATE todo.tasks SET task_description = '${value.taskDescription}'
    WHERE user_id = ${value.userId} AND task_id = ${value.taskId}
  `;

  connection.query(sql, (err, results) => {
    if (err) return console.log(err);
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



app.listen(app.get('port'), () => {
  console.log("Сервер ожидает подключения...");
});
