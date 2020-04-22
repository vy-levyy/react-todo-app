import TodoRequests from './TodoRequests';
import notification from '../notification';

function getEndPoint(url) {
  const urlWithoutProtocol = url.slice(url.indexOf('//') + 2);
  const endPoint = urlWithoutProtocol.slice(urlWithoutProtocol.indexOf('/'));

  return endPoint;
}

function showErrorOnConsole(response) {
  if (response.data) {
    const message      = response.data.message || '';
    const functionName = message      !== '' ? `${response.data.function}: ` : '';
    const statusText   = functionName !== '' ? `${response.statusText} of `  : response.statusText;
    const status       = `${response.status} `;
  
    console.error(status + statusText + functionName + message);
  } else {
    console.error(response);
  }
}

function errorForNotification(response) {
  if (response.data) {
    const functionName = response.data.function ? ` of ${response.data.function}` : '';
    return response.statusText + functionName;
  }
  
  return response;
}

class TodoHandlers {
  static async handleAuthentification () {
    const response = await TodoRequests.authentification();
    return Boolean(response.status && response.status === 200);
  }

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
      if (getEndPoint(response.config.url) === '/task-list') {
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
