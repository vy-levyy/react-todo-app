const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');

router.get('/task_list', controller.getUserTaskList);

module.exports = router;