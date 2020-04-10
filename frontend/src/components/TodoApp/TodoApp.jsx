import React from 'react';
import Logo from '../Logo/Logo.jsx';
import TodoHeader from '../TodoHeader/TodoHeader.jsx';
import List from '../List/List.jsx';
import TodoFooter from '../TodoFooter/TodoFooter.jsx';
import TodoNotificationList from '../TodoNotificationList/TodoNotificationList.jsx';
import './style.css';
import TodoRequests from '../../TodoRequests';
import successfullyNotificationMap from '../../successfullyNotificationMap';



class TodoApp extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      taskList: [],
      itemsCounter: 0,
      activeItemsCounter: 0,
      completedItemsCounter: 0,
      isAllCompletedTasks: false,
      filter: 'All',
      notificationStatus: '',

      // temp
      userId: 1
    };
  }


  componentDidMount = async () => {
    await this.updateStates();
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (JSON.stringify(this.state.taskList) === JSON.stringify(nextState.taskList)) {
  //     if (this.state.itemsCounter === nextState.itemsCounter) {
  //       if (this.state.filter === nextState.filter) {
  //         return false;
  //       }
  //     }
  //   }

  //   return true;
  // }


  getTaskList(filter) {
    const {taskList} = this.state;

    return taskList.filter((task) => {
      switch(filter) {
        case 'All':
          return true;
        case 'Active':
          return !task.isDone;
        case 'Completed':
          return task.isDone;
        default:
          return false;
      }
    });
  }

  updateTaskList = async () => {
    const taskList = await TodoRequests.getTaskList(this.state.userId);
    this.setState({taskList});
  }

  updateCounters() {
    this.setState((state) => {
      const {taskList} = state;
      let activeItemsCounter = 0;
      let completedItemsCounter = 0;

      taskList.map((task) => {
        if (!task.isDone) activeItemsCounter += 1;
        if (task.isDone) completedItemsCounter += 1;

        return task;
      });

      return {
        activeItemsCounter,
        completedItemsCounter,
        itemsCounter: activeItemsCounter + completedItemsCounter,
      };
    });
  }

  updateIsAllCompletedTasks() {
    this.setState((state) => {
      return {
        isAllCompletedTasks: state.itemsCounter !== 0 && state.itemsCounter === state.completedItemsCounter
      }
    });
  }

  updateStates = async () => {
    await this.updateTaskList();
    this.updateCounters();
    this.updateIsAllCompletedTasks();
  }

  hasCompletedTasks() {
    return Boolean(this.state.completedItemsCounter);
  }

  isEmptyTaskList() {
    return !Boolean(this.state.itemsCounter);
  }

  setNotificationStatus(notificationStatus) {
    this.setState({notificationStatus});
    // this.setState(() => {
    //   return {
    //     notificationStatus: ''
    //   }
    // });
  }



  handleAddTaskChange = async (taskDescription) => {
    await TodoRequests.addTask(this.state.userId, taskDescription);
    await this.updateStates();
    this.setNotificationStatus(successfullyNotificationMap.get(0));
  }


  handleRemoveTaskChange = async (taskId) => {
    await TodoRequests.removeTask(this.state.userId, taskId);
    await this.updateStates();
    this.setNotificationStatus(successfullyNotificationMap.get(1));
  }


  handleChangeTaskMarkChange = async (taskId) => {
    let {taskList} = this.state;
    let isDone = null;

    taskList.forEach((task) => {
      if (task.id === taskId) isDone = !task.isDone;
    });

    if (isDone != null) {
      await TodoRequests.changeTaskMark(this.state.userId, taskId, isDone);
      await this.updateStates();
      this.setNotificationStatus(successfullyNotificationMap.get(2));
    }
  }


  handleChangeFilterChange = (filterStatus) => {
    this.setState({filter: filterStatus});
    this.setNotificationStatus(successfullyNotificationMap.get(3));
  }


  handleRemoveCompletedTasksChange = async () => {
    let {taskList} = this.state;

    const completedTasks = taskList.filter((task) => {
      return task.isDone;
    });

    let taskIds = [];

    completedTasks.forEach((task) => {
      taskIds.push(task.id);
    });

    await TodoRequests.removeCompletedTasks( this.state.userId, taskIds);
    await this.updateStates();
    this.setNotificationStatus(successfullyNotificationMap.get(4));
  }


  handleChangeAllTaskMarksChange = async () => {
    await TodoRequests.changeAllTaskMarks(this.state.userId, !this.state.isAllCompletedTasks);
    await this.updateStates();
    this.setNotificationStatus(successfullyNotificationMap.get(5));
  }


  handleChangeTaskDescriptionChange = async (taskId, taskDescription) => {
    await TodoRequests.changeTaskDescription(
      this.state.userId,
      taskId,
      taskDescription.trim()
    );
    await this.updateTaskList();
    this.setNotificationStatus(successfullyNotificationMap.get(6));
  }



  getTodoFooter() {
    let todoFooter = '';

    if (!this.isEmptyTaskList()) {
      todoFooter = (
        <TodoFooter
          className="row justify-content-center"
          itemsCounter={this.state.itemsCounter}
          activeItemsCounter={this.state.activeItemsCounter}
          completedItemsCounter={this.state.completedItemsCounter}
          filter={this.state.filter}
          handleChangeFilterChange={this.handleChangeFilterChange}
          shouldShowClearCompletedItemsButton={this.hasCompletedTasks()}
          handleRemoveCompletedTasksChange={this.handleRemoveCompletedTasksChange}
        />
      );
    }

    return todoFooter;
  }



  render() {
    return (
      <div className={this.props.className + " todo-app"}>
        <TodoNotificationList className="row">
          {this.state.notificationStatus}
        </TodoNotificationList>
        <Logo className="row"/>
        <div className="row todo-wrap">
          <div className="col">
            <TodoHeader
              className="row align-items-center"
              handleAddTaskChange={this.handleAddTaskChange}
              shouldShowListStatusCheckbox={!this.isEmptyTaskList()}
              shouldActiveListStatusCheckbox={this.state.isAllCompletedTasks}
              handleChangeAllTaskMarksChange={this.handleChangeAllTaskMarksChange}
            />
            <List
              className="row"
              taskList={this.getTaskList(this.state.filter)}
              handleChangeTaskMarkChange={this.handleChangeTaskMarkChange}
              handleRemoveTaskChange={this.handleRemoveTaskChange}
              handleChangeTaskDescriptionChange={this.handleChangeTaskDescriptionChange}
            />
            {this.getTodoFooter()}
          </div>
        </div>
      </div>
    );
  }
}

export default TodoApp;
