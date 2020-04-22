const model = require('../models/model').task_list;
const { handleModel } = require('./handlers');

exports.task_list = (req, res) => {
  handleModel(res, model(req.userId));
}
