const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { secretKey } = require('../../config');

function handleModel(res, modelPromise) {
  modelPromise
    .then((result) => {
      result = typeof(result) === 'object' ? result : {};
      res.status(200).send(result);
    })
    .catch((error) => {
      handleError(res, error, 500);
  });
}

function handleSigninModel(res, modelPromise, password) {
  modelPromise
    .then((user) => {
      if (!user) {
        return handleError(res, 'User not found', 404);
      }

      const isValidPassword = bcrypt.compareSync(password, user.password);

      if (!isValidPassword) {
        return handleError(res, 'Invalid password', 401);
      }

      const token = jwt.sign(
        { id: user.id, },
        secretKey,
        { expiresIn: 86400 }
      );

      res.status(200).send({ accessToken: token });
  })
    .catch((error) => {
      handleError(res, error, 500);
  });
}

function handleError(res, error, code) {
  if (typeof(error) !== 'string') {
    error = error.details ? error.details[0].message : error;
  }

  res.status(code).send({
    message: error
  });
}

module.exports = {
  handleModel,
  handleSigninModel,
  handleError
};
