require('dotenv').config();
const express = require('express');
const app = express();
const router = require('./src/routes/router');


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

const port = process.env.PORT || 3000;

app.set('port', port);

app.listen(port, () => {
  console.log(`Сервер подключился к порту ${port}`);
});
