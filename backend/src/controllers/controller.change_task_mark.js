const Joi = require('@hapi/joi');
const model = require('../models/model').change_task_mark;
const { handleModel, handleError } = require('./handlers');
const { taskId, isDone } = require('./validationSchemas');

exports.change_task_mark = (req, res) => {
  const schema = Joi.object({ taskId, isDone });

  const { error, value } = schema.validate(req.body);

  if (error) {
    handleError(res, error, 400);
  } else {
    handleModel(res, model(req.userId, value.taskId, value.isDone));
  }
}
