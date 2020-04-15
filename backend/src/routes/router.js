const express = require('express');
const router = express.Router();

const controller = require('../controllers/controller');

router.get('/task-list', controller.task_list);
router.post('/create-task', controller.create_task);
router.delete('/delete-task', controller.delete_task);
router.put('/change-task-mark', controller.change_task_mark);
router.delete('/delete-completed-tasks', controller.delete_completed_tasks);
router.put('/change-all-task-marks', controller.change_all_task_marks);
router.put('/change-task-description', controller.change_task_description);

module.exports = router;