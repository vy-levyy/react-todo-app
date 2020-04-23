module.exports = {
  authentification: require('./controller.authentification').authentification,
  signup: require('./controller.signup').signup,
  signin: require('./controller.signin').signin,
  task_list: require('./controller.task_list').task_list,
  email: require('./controller.email').email,
  create_task: require('./controller.create_task').create_task,
  delete_task: require('./controller.delete_task').delete_task,
  change_task_mark: require('./controller.change_task_mark').change_task_mark,
  delete_completed_tasks: require('./controller.delete_completed_tasks').delete_completed_tasks,
  change_all_task_marks: require('./controller.change_all_task_marks').change_all_task_marks,
  change_task_description: require('./controller.change_task_description').change_task_description
}
