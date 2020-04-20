import TodoRequests from './TodoRequests';
import notification from '../notification';

function getEndPoint(url) {
  const urlWithoutProtocol = url.slice(url.indexOf('//') + 2);
  const endPoint = urlWithoutProtocol.slice(urlWithoutProtocol.indexOf('/'));

  return endPoint;
}

function showErrorOnConsole(response) {
  if (response.status !== 500) {
      console.error(''
      + response.status + ' '
      + response.statusText + ' of '
      + response.data.function + ': '
      + response.data.message
    );
  } else {
    console.error(`${response.status} ${response.statusText}`);
  }
}

function errorForNotification(response) {
  if (response.status !== 500) {
    return `${response.statusText} of ${response.data.function}`
  }
  return `${response.statusText}`;
}

class TodoHandlers {
  static async handleGetTaskList () {
    const response = await TodoRequests.getTaskList(this.state.userId);
    TodoHandlers.handleResponse.call(this, response);
  }

  static async handleAddTaskChange (taskDescription) {
    const response = await TodoRequests.addTask(this.state.userId, taskDescription);
    TodoHandlers.handleResponse.call(this, response);
  }

  static async handleRemoveTaskChange (taskId) {
    const response = await TodoRequests.removeTask(this.state.userId, taskId);
    TodoHandlers.handleResponse.call(this, response);
  }

  static async handleChangeTaskMarkChange (taskId) {
    let {taskList} = this.state;
    let isDone = null;

    taskList.forEach((task) => {
      if (task.id === taskId) isDone = !task.isDone;
    });


    if (isDone != null) {
      const response = await TodoRequests.changeTaskMark(this.state.userId, taskId, isDone);

      TodoHandlers.handleResponse.call(this, response);
    }
  }

  static async handleChangeFilterChange (filterStatus) {
    this.setState({
      filter: filterStatus,
      notification: notification.success('/change-filter')
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

    TodoHandlers.handleResponse.call(this, response);
  }

  static async handleChangeAllTaskMarksChange () {
    const response = await TodoRequests.changeAllTaskMarks(
      this.state.userId,
      !this.state.isAllCompletedTasks
    );

    TodoHandlers.handleResponse.call(this, response);
  }

  static async handleChangeTaskDescriptionChange (taskId, taskDescription) {
    const response = await TodoRequests.changeTaskDescription(
      this.state.userId,
      taskId,
      taskDescription.trim()
    );

    TodoHandlers.handleResponse.call(this, response);
  }

  static handleResponse(response) {
    if (response.status === 200) {
      if (response.config.method === 'get') {
        this.updateStateOn(response.data);
      } else {
        this.setState({
          notification: notification.success(getEndPoint(response.config.url))
        });

        this.updateTaskList();
      }
    } else {
      showErrorOnConsole(response);

      this.setState({
        notification: notification.error(errorForNotification(response))
      });
    }
  }
}

export default TodoHandlers;
