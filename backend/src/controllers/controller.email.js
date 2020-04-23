const model = require('../models/model').email;
const { handleModel } = require('./handlers');

exports.email = (req, res) => {
  handleModel(res, model(req.userId));
}
