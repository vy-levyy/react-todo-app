import TodoRequests from './TodoRequests';
import successfullyNotificationMap from './successfullyNotificationMap';


class TodoHandlers {
  static async handleAddTaskChange (taskDescription) {
    const response = await TodoRequests.addTask(this.state.userId, taskDescription);

    if (response.data !== undefined) {
      this.setState({
        notificationStatus: successfullyNotificationMap.get(0)
      });

      this.updateTaskList();
    } else {
      this.setState({
        notificationStatus: response.toString()
      });
    }
  }


  static async handleRemoveTaskChange (taskId) {
    const response = await TodoRequests.removeTask(this.state.userId, taskId);

    if (response.data !== undefined) {
      this.setState({
        notificationStatus: successfullyNotificationMap.get(1)
      });

      this.updateTaskList();
    } else {
      this.setState({
        notificationStatus: response.toString()
      });
    }
  }


  static async handleChangeTaskMarkChange (taskId) {
    let {taskList} = this.state;
    let isDone = null;

    taskList.forEach((task) => {
      if (task.id === taskId) isDone = !task.isDone;
    });


    if (isDone != null) {
      const response = await TodoRequests.changeTaskMark(this.state.userId, taskId, isDone);

      if (response.data !== undefined) {
        this.setState({
          notificationStatus: successfullyNotificationMap.get(2)
        });

        this.updateTaskList();
      } else {
        this.setState({
          notificationStatus: response.toString()
        });
      }
    }
  }


  static async handleChangeFilterChange (filterStatus) {
    this.setState({
      filter: filterStatus,
      notificationStatus: successfullyNotificationMap.get(3)
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

    if (response.data !== undefined) {
      this.setState({
        notificationStatus: successfullyNotificationMap.get(4)
      });

      this.updateTaskList();
    } else {
      this.setState({
        notificationStatus: response.toString()
      });
    }
  }


  static async handleChangeAllTaskMarksChange () {
    const response = await TodoRequests.changeAllTaskMarks(
      this.state.userId,
      !this.state.isAllCompletedTasks
    );

    if (response.data !== undefined) {
      this.setState({
        notificationStatus: successfullyNotificationMap.get(5)
      });

      this.updateTaskList();
    } else {
      this.setState({
        notificationStatus: response.toString()
      });
    }
  }


  static async handleChangeTaskDescriptionChange (taskId, taskDescription) {
    const response = await TodoRequests.changeTaskDescription(
      this.state.userId,
      taskId,
      taskDescription.trim()
    );

    if (response.data !== undefined) {
      this.setState({
        notificationStatus: successfullyNotificationMap.get(6)
      });

      this.updateTaskList();
    } else {
      this.setState({
        notificationStatus: response.toString()
      });
    }
  }
}


export default TodoHandlers;
