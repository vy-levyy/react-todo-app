const express = require('express');
const router = express.Router();
const verifySignUp = require('./verifySignUp');
const verifyJwtToken = require('./verifyJwtToken');
const controller = require('../controllers/controller');

router.get('/authentification', verifyJwtToken, controller.authentification);
router.post('/signup', verifySignUp, controller.signup);
router.post('/signin', controller.signin);
router.get('/task-list', verifyJwtToken, controller.task_list);
router.post('/create-task', verifyJwtToken, controller.create_task);
router.delete('/delete-task', verifyJwtToken, controller.delete_task);
router.put('/change-task-mark', verifyJwtToken, controller.change_task_mark);
router.delete('/delete-completed-tasks', verifyJwtToken, controller.delete_completed_tasks);
router.put('/change-all-task-marks', verifyJwtToken, controller.change_all_task_marks);
router.put('/change-task-description', verifyJwtToken, controller.change_task_description);

module.exports = router;
