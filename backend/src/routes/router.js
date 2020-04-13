const express = require('express');
const router = express.Router();

const controller = require('../controllers/controller');


router.get('/task_list', controller.task_list);
router.post('/create_task', controller.create_task);
router.delete('/delete_task', controller.delete_task);
router.put('/change_task_mark', controller.change_task_mark);
router.delete('/delete_completed_tasks', controller.delete_completed_tasks);
router.put('/change_all_task_marks', controller.change_all_task_marks);
router.put('/change_task_description', controller.change_task_description);


module.exports = router;