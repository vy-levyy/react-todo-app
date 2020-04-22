const Joi = require('@hapi/joi');
const model = require('../models/model').change_task_description;
const { handleModel, handleError } = require('./handlers');
const { taskId, taskDescription } = require('./validationSchemas');

exports.change_task_description = (req, res) => {
  const schema = Joi.object({ taskId, taskDescription });

  const { error, value } = schema.validate(req.body);

  if (error) {
    handleError(res, error, 400);
  } else {
    handleModel(res, model(
      req.userId,
      value.taskId,
      value.taskDescription
    ));
  }
}
