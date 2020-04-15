import TodoRequests from './TodoRequests';
import notification from '../notification';

class TodoHandlers {
  static async handleAddTaskChange (taskDescription) {
    const response = await TodoRequests.addTask(this.state.userId, taskDescription);
    
    TodoHandlers.handleResponse.call(this, response, 0);
  }

  static async handleRemoveTaskChange (taskId) {
    const response = await TodoRequests.removeTask(this.state.userId, taskId);

    TodoHandlers.handleResponse.call(this, response, 1);
  }

  static async handleChangeTaskMarkChange (taskId) {
    let {taskList} = this.state;
    let isDone = null;

    taskList.forEach((task) => {
      if (task.id === taskId) isDone = !task.isDone;
    });


    if (isDone != null) {
      const response = await TodoRequests.changeTaskMark(this.state.userId, taskId, isDone);

      TodoHandlers.handleResponse.call(this, response, 2);
    }
  }

  static async handleChangeFilterChange (filterStatus) {
    this.setState({
      filter: filterStatus,
      notification: notification.success(3)
    });
  }

  static async handleRemoveCompletedTasksChange () {
    let {taskList} = this.state;

    const completedTasks = taskList.filter((task) => {
      return task.isDone;
    });

    let taskIds = [];

    completedTasks.forEach((task) => {
      taskIds.push(task.id);
    });

    const response = await TodoRequests.removeCompletedTasks(this.state.userId, taskIds);

    TodoHandlers.handleResponse.call(this, response, 4);
  }

  static async handleChangeAllTaskMarksChange () {
    const response = await TodoRequests.changeAllTaskMarks(
      this.state.userId,
      !this.state.isAllCompletedTasks
    );

    TodoHandlers.handleResponse.call(this, response, 5);
  }

  static async handleChangeTaskDescriptionChange (taskId, taskDescription) {
    const response = await TodoRequests.changeTaskDescription(
      this.state.userId,
      taskId,
      taskDescription.trim()
    );

    TodoHandlers.handleResponse.call(this, response, 6);
  }

  static handleResponse(response, successNotificationNumber) {
    if (response.status === 200) {
      if (response.config.method === 'get') {
        this.updateStateOn(response.data);
      } else {
        this.setState({
          notification: notification.success(successNotificationNumber)
        });

        this.updateTaskList();
      }
    } else {
      this.setState({
        notification: notification.error(response)
      });
    }
  }
}

export default TodoHandlers;
