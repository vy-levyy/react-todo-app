const { User } = require('../models/config.db');

checkDuplicateEmail = (req, res, next) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then((user) => {
      if (user) {
        return res.status(400).send('Email is already taken');
      }

      next();
    });
}

module.exports = (req, res, next) => {
  checkDuplicateEmail(req, res, next);
}
