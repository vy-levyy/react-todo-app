const model = require('../models/model').change_all_task_marks;
const { handleModel, handleError } = require('./handlers');
const { isDone } = require('./validationSchemas');

exports.change_all_task_marks = (req, res) => {
  const { error, value } = isDone.validate(req.body.isDone);

  if (error) {
    handleError(res, error, 400);
  } else {
    handleModel(res, model(req.userId, value));
  }
}
