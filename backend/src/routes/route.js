const express = require('express');
const router = express.Router();

const controller = require('../controllers/controller');

router.post('/create', controller.add);

module.exports = router;