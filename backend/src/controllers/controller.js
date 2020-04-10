const model = require('../models/model');

exports.getUserTaskList = (req, res) => {
  const userId = req.query.tempUserId;
  model.getUserTaskList(res, userId);
}