const Joi = require('@hapi/joi');

const taskIdSchema = Joi.number().integer().min(0).required();

const validationSchemas = {
  email: Joi.string().email().required(),
  password: Joi.string().pattern(/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/).required(),
  taskId: taskIdSchema,
  taskDescription: Joi.string().min(1).max(255).required(),
  isDone: Joi.boolean().required(),
  taskIds: Joi.array().items(taskIdSchema).required()
}

module.exports = validationSchemas;
