const model = require('../models/model');
const Joi = require('@hapi/joi');
const joiSchemas = require('../joiSchemas');


function handleModel(res, modelPromise, isGetMethod = false) {
  modelPromise
    .then((result) => {
      res.status(200).send(isGetMethod ? result[0] : result);
    })
    .catch((error) => {
      res.send({message: error.details[0].message});
  });
}

function handleValidationError(res, error, functionName) {
  return res.status(400).send({
    message: error.details[0].message,
    function: functionName
  });
}

exports.task_list = (req, res) => {
  const { error, value } = joiSchemas.userId.validate(req.query.userId);

  if (error) handleValidationError(res, error, 'task list');
  else handleModel(res, model.task_list(value), req.route.methods.get);
}

exports.create_task = (req, res) => {
  const schema = Joi.object({
    userId: joiSchemas.userId,
    taskDescription: joiSchemas.taskDescription
  });
  const { error, value } = schema.validate(req.body);

  if (error) handleValidationError(res, error, 'create task');
  else handleModel(res, model.create_task(value.userId, value.taskDescription));
}

exports.delete_task = (req, res) => {
  const schema = Joi.object({
    userId: joiSchemas.userId,
    taskId: joiSchemas.taskId
  });
  const {error, value} = schema.validate(req.query);

  if (error) handleValidationError(res, error, 'delete task');
  else handleModel(res, model.delete_task(value.userId, value.taskId));
}

exports.change_task_mark = (req, res) => {
  const schema = Joi.object({
    userId: joiSchemas.userId,
    taskId: joiSchemas.taskId,
    isDone: joiSchemas.isDone
  });

  const {error, value} = schema.validate(req.body);

  if (error) handleValidationError(res, error, 'change task mark');
  else handleModel(res, model.change_task_mark(value.userId, value.taskId, value.isDone));
}

exports.delete_completed_tasks = (req, res) => {
  const schema = Joi.object({
    userId: joiSchemas.userId,
    taskIds: joiSchemas.taskIds
  });
  const {error, value} = schema.validate(req.query);

  if (error) handleValidationError(res, error, 'delete completed tasks');
  else handleModel(res, model.delete_completed_tasks(value.userId, value.taskIds));
}

exports.change_all_task_marks = (req, res) => {
  const schema = Joi.object({
    userId: joiSchemas.userId,
    isDone: joiSchemas.isDone
  });
  const {error, value} = schema.validate(req.body);

  if (error) handleValidationError(res, error, 'change all task marks');
  else handleModel(res, model.change_all_task_marks(value.userId, value.isDone));
}

exports.change_task_description = (req, res) => {
  const schema = Joi.object({
    userId: joiSchemas.userId,
    taskId: joiSchemas.taskId,
    taskDescription: joiSchemas.taskDescription
  });
  const {error, value} = schema.validate(req.body);

  if (error) handleValidationError(res, error, 'change task description');
  else handleModel(res, model.change_task_description(
    value.userId,
    value.taskId,
    value.taskDescription
  ));
}
