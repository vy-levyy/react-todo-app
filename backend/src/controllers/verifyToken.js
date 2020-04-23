const jwt = require('jsonwebtoken');
const { handleError } = require('./handlers');
const { secretKey } = require('../../config');


verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    return handleError(res, 'No token provided', 403);
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return handleError(res, 'Fail to authentication', 403);
    }

    req.userId = decoded.id;
    next();
  });
}

module.exports = verifyToken;
