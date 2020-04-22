const model = require('../models/model').create_task;
const { handleModel, handleError } = require('./handlers');
const { taskDescription } = require('./validationSchemas');

exports.create_task = (req, res) => {
  const { error, value } = taskDescription.validate(req.body.taskDescription);

  if (error) {
    handleError(res, error, 400);
  } else {
    handleModel(res, model(req.userId, value));
  }
}
