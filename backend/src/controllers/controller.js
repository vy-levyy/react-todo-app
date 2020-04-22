const model = require('../models/model');
const Joi = require('@hapi/joi');
const validationSchemas = require('../validationSchemas');
const { User } = require('../models/config.db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { secretKey } = require('../../config');

function handleModel(res, modelPromise) {
  modelPromise
    .then((result) => {
      console.log(result)
      res.status(200).send(result);
    })
    .catch((error) => {
      console.log(error)
      res.send({message: error.details[0].message});
  });
}

function handleValidationError(res, error, functionName) {
  return res.status(400).send({
    message: error.details[0].message,
    function: functionName
  });
}

exports.authentification = (req, res) => {
  res.sendStatus(200);
}

exports.signup = (req, res) => {
  User.create({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  });
}

exports.signin = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then((user) => {
    if (!user) {
      return res.status(404).send('User not found');
    }

    const isValidPassword = bcrypt.compareSync(req.body.password, user.password);

    if (!isValidPassword) {
      return res.status(401).send({
        auth: false,
        accessToken: null,
        reason: 'Invalid password'
      });
    }

    const token = jwt.sign(
      { id: user.id, },
      secretKey,
      { expiresIn: 86400 }
    );

    res.status(200).send({ auth: true, accessToken: token });
  }).catch((err) => {
    res.status(500).send(`Error: ${err}`);
  })
}

exports.task_list = (req, res) => {
  const { error, value } = validationSchemas.userId.validate(req.userId);

  if (error) handleValidationError(res, error, 'task list');
  else handleModel(res, model.task_list(value));
}

exports.create_task = (req, res) => {
  const schema = Joi.object({
    taskDescription: validationSchemas.taskDescription
  });
  const { error, value } = schema.validate(req.body);

  if (error) handleValidationError(res, error, 'create task');
  else handleModel(res, model.create_task(req.userId, value.taskDescription));
}

exports.delete_task = (req, res) => {
  const schema = Joi.object({
    taskId: validationSchemas.taskId
  });
  const {error, value} = schema.validate(req.query);

  if (error) handleValidationError(res, error, 'delete task');
  else handleModel(res, model.delete_task(req.userId, value.taskId));
}

exports.change_task_mark = (req, res) => {
  const schema = Joi.object({
    taskId: validationSchemas.taskId,
    isDone: validationSchemas.isDone
  });

  const {error, value} = schema.validate(req.body);

  if (error) handleValidationError(res, error, 'change task mark');
  else handleModel(res, model.change_task_mark(req.userId, value.taskId, value.isDone));
}

exports.delete_completed_tasks = (req, res) => {
  const schema = Joi.object({
    taskIds: validationSchemas.taskIds
  });
  const {error, value} = schema.validate(req.query);

  if (error) handleValidationError(res, error, 'delete completed tasks');
  else handleModel(res, model.delete_completed_tasks(req.userId, value.taskIds));
}

exports.change_all_task_marks = (req, res) => {
  const schema = Joi.object({
    isDone: validationSchemas.isDone
  });
  const {error, value} = schema.validate(req.body);

  if (error) handleValidationError(res, error, 'change all task marks');
  else handleModel(res, model.change_all_task_marks(req.userId, value.isDone));
}

exports.change_task_description = (req, res) => {
  const schema = Joi.object({
    taskId: validationSchemas.taskId,
    taskDescription: validationSchemas.taskDescription
  });
  const {error, value} = schema.validate(req.body);

  if (error) handleValidationError(res, error, 'change task description');
  else handleModel(res, model.change_task_description(
    req.userId,
    value.taskId,
    value.taskDescription
  ));
}
