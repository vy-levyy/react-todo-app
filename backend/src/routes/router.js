const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const controller = require('../controllers/controller');

router.get('/authentification', verifyToken, controller.authentification);
router.post('/signup', controller.signup);
router.post('/signin', controller.signin);
router.get('/task-list', verifyToken, controller.task_list);
router.get('/email', verifyToken, controller.email);
router.post('/create-task', verifyToken, controller.create_task);
router.delete('/delete-task', verifyToken, controller.delete_task);
router.put('/change-task-mark', verifyToken, controller.change_task_mark);
router.delete('/delete-completed-tasks', verifyToken, controller.delete_completed_tasks);
router.put('/change-all-task-marks', verifyToken, controller.change_all_task_marks);
router.put('/change-task-description', verifyToken, controller.change_task_description);

module.exports = router;
