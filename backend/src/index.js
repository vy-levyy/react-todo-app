require('dotenv').config();
const mysql = require('mysql2');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const addroute = require('./routes/route.js');
const controller = require('./controllers/controller');
  
const urlencodedParser = bodyParser.urlencoded({extended: false});
const connection = mysql.createConnection({
  host: 'localhost',
  user: process.env.DB_USER,
  database: process.env.DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

// app.get('/', function (req, res) {
  
//   // res.send('fds')
// });

app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env.HOST);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/task_list', (req, res) => {
  // const userId = req.body.tempUserId;

  connection.query(
    `SELECT
      task_id AS taskId,
      task_description AS taskDescription,
      done AS isDone
    FROM todo.tasks
    WHERE user_id = 1`,
    (err, results) => { res.send(results); }
  );
});


app.get('/str', function (req, res) {
  let result;
  connection.query('SELECT * FROM todo.data', function(err, results) {
    result = results;
    res.send(result)
  });
  
  res.send('good');
});

app.post('/add_task', urlencodedParser, function(req, res) {
  // if(!req.body) return res.sendStatus(400);
  
  // connection.query("INSERT INTO todo.data (user_id, task_list) VALUES (?,?)", [11, req.body.task], function(err, data) {
  //   if(err) return console.log(err);
  // });
});


connection.connect(function(err){
  if (err) {
    return console.error("Ошибка: " + err.message);
  }
  else{
    console.log("Подключение к серверу MySQL успешно установлено");
  }
});

app.listen(3001, function(){
  console.log("Сервер ожидает подключения...");
});
