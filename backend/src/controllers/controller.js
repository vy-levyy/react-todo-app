const addFunction = require('../models/model');

exports.add = (req, res) => {
  addFunction();
  res.send('Successful');
}