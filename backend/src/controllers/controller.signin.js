const Joi = require('@hapi/joi');
const model = require('../models/model').signin;
const { handleSigninModel, handleError } = require('./handlers');
const { email, password } = require('./validationSchemas');

exports.signin = (req, res) => {
  const schema = Joi.object({ email, password });

  const { error, value } = schema.validate(req.body);

  if (error) {
    handleError(res, error, 400);
  } else {
    handleSigninModel(res, model(value.email), value.password);
  }
}
