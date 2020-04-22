require('dotenv').config();
const express = require('express');
const app = express();
const router = require('./src/routes/router');
const sequelize = require('./src/models/config.db');
const Sequelize = require('sequelize');
// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;


app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env.ORIGIN);
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, X-Access-Token'
  );
  next();
});

app.use('/', router);

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
  console.log(`Сервер подключился к порту ${app.get('port')}`);
});
