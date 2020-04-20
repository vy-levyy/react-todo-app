const Joi = require('@hapi/joi');

const taskIdSchema = Joi.number().integer().min(0).required();

const validationSchemas = {
  userId: Joi.number().integer().min(1).required(),
  taskId: taskIdSchema,
  taskDescription: Joi.string().min(1).max(255).required(),
  isDone: Joi.boolean().required(),
  taskIds: Joi.array().items(taskIdSchema).required()
}

module.exports = validationSchemas;