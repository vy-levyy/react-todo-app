const model = require('../models/model').delete_task;
const { handleModel, handleError } = require('./handlers');
const { taskId } = require('./validationSchemas');

exports.delete_task = (req, res) => {
  const { error, value } = taskId.validate(req.query.taskId);

  if (error) {
    handleError(res, error, 400);
  } else {
    handleModel(res, model(req.userId, value));
  }
}
