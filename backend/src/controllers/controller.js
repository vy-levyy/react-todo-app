const model = require('../models/model');
const Joi = require('@hapi/joi');
const joiSchemas = require('../joiSchemas');


exports.task_list = (req, res) => {
  const { error, value } = joiSchemas.userId.validate(req.query.userId);

  if (error) {
    console.log(error.details[0].message);
    return res.status(400).send(error.details[0].message);
  }

  model.task_list(value)
    .then(([rows]) => {
      if (rows.length !== 0) {
        res.send(rows);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      return console.log(err);
    });
}


exports.create_task = (req, res) => {
  const schema = Joi.object({
    userId: joiSchemas.userId,
    taskDescription: joiSchemas.taskDescription
  });
  const { error, value } = schema.validate(req.body);

  if (error) {
    console.log(error.details[0].message);
    return res.status(400).send(error.details[0].message);
  }

  model.create_task(value.userId, value.taskDescription)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      return console.log(err);
    });
}

exports.delete_task = (req, res) => {
  const schema = Joi.object({
    userId: joiSchemas.userId,
    taskId: joiSchemas.taskId
  });
  const {error, value} = schema.validate(req.query);

  if (error) {
    console.log(error.details[0].message);
    return res.status(400).send(error.details[0].message);
  }

  model.delete_task(value.userId, value.taskId)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      return console.log(err);
    });
}


exports.change_task_mark = (req, res) => {
  const schema = Joi.object({
    userId: joiSchemas.userId,
    taskId: joiSchemas.taskId,
    isDone: joiSchemas.isDone
  });

  const {error, value} = schema.validate(req.body);

  if (error) {
    console.log(error.details[0].message);
    return res.status(400).send(error.details[0].message);
  }

  model.change_task_mark(value.userId, value.taskId, value.isDone)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      return console.log(err);
    });
}


exports.delete_completed_tasks = (req, res) => {
  const schema = Joi.object({
    userId: joiSchemas.userId,
    taskIds: joiSchemas.taskIds
  });
  const {error, value} = schema.validate(req.query);

  if (error) {
    console.log(error.details[0].message);
    return res.status(400).send(error.details[0].message);
  }

  model.delete_completed_tasks(value.userId, value.taskIds)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      return console.log(err);
    });
}


exports.change_all_task_marks = (req, res) => {
  const schema = Joi.object({
    userId: joiSchemas.userId,
    isDone: joiSchemas.isDone
  });
  const {error, value} = schema.validate(req.body);

  if (error) {
    console.log(error.details[0].message);
    return res.status(400).send(error.details[0].message);
  }

  model.change_all_task_marks(value.userId, value.isDone)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      return console.log(err);
    });
}


exports.change_task_description = (req, res) => {
  const schema = Joi.object({
    userId: joiSchemas.userId,
    taskId: joiSchemas.taskId,
    taskDescription: joiSchemas.taskDescription
  });
  const {error, value} = schema.validate(req.body);

  if (error) {
    console.log(error.details[0].message);
    return res.status(400).send(error.details[0].message);
  }

  model.change_task_description(value.userId, value.taskId, value.taskDescription)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      return console.log(err);
    });
}
