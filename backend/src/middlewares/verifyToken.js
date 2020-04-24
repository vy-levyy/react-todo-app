const jwt = require('jsonwebtoken');
const { handleError } = require('../controllers/handlers');

verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    return handleError(res, 'No token provided', 403);
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return handleError(res, 'Fail to authentication', 401);
    }

    req.userId = decoded.id;
    next();
  });
}

module.exports = verifyToken;
