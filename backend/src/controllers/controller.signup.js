const Joi = require('@hapi/joi');
const bcrypt = require('bcryptjs');
const { signup, find_user } = require('../models/model');
const { salt } = require('../../config');
const { handleModel, handleError } = require('./handlers');
const { email, password } = require('./validationSchemas');

exports.signup = (req, res) => {
  const schema = Joi.object({ email, password });

  const { error, value } = schema.validate(req.body);

  if (error) {
    handleError(res, error, 400);
  } else {
    find_user(value.email)
      .then((user) => {
        if (user) {
          handleError(res, 'Email is already taken', 400)
        }
      })
        .catch((error) => {
          handleError(res, error, 500);
      });

    value.password = bcrypt.hashSync(value.password, salt);
    
    handleModel(res, signup(value.email, value.password));
  }
}
