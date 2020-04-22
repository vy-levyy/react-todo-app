const model = require('../models/model').delete_completed_tasks;
const { handleModel, handleError } = require('./handlers');
const { taskIds } = require('./validationSchemas');

exports.delete_completed_tasks = (req, res) => {
  const { error, value } = taskIds.validate(req.query.taskIds);

  if (error) {
    handleError(res, error, 400);
  } else {
    handleModel(res, model(req.userId, value));
  }
}
