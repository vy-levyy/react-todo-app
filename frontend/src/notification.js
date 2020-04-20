const successfullyNotificationMap = new Map([
  ['/create-task', 'Task added successfully!'],
  ['/delete-task', 'Task removed successfully!'],
  ['/change-task-mark', 'Task mark changed successfully!'],
  ['/change-filter', 'Filter changed successfully!'],
  ['/delete-completed-tasks', 'Completed tasks removed successfully!'],
  ['/change-all-task-marks', 'Task list mark changed successfully!'],
  ['/change-task-description', 'Task description changed successfully!'],
]);

const notification = {
  success(endPoint) {
    return {
      description: successfullyNotificationMap.get(endPoint),
      status: 'success'
    }
  },

  error(description) {
    return {
      description,
      status: 'danger'
    }
  }
}

export default notification;