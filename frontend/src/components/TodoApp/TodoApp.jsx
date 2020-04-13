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
    const response = await TodoRequests.getTaskList(this.state.userId);
    
    if (response.data !== undefined) {
      this.updateState(response.data, null);
    } else {
      this.setState({
        notificationStatus: response.toString()
      });
    }
  }


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

  getNextCounters(nextTaskList) {
    let nextActiveItemsCounter = 0;
    let nextCompletedItemsCounter = 0;

    nextTaskList.map((task) => {
      if (!task.isDone) nextActiveItemsCounter += 1;
      if (task.isDone) nextCompletedItemsCounter += 1;

      return task;
    });

    return {
      nextActiveItemsCounter,
      nextCompletedItemsCounter,
      nextItemsCounter: nextActiveItemsCounter + nextCompletedItemsCounter,
    };
  }

  getNextIsAllCompletedTasks(nextItemsCounter, nextCompletedItemsCounter) {
    return nextItemsCounter !== 0 && nextItemsCounter === nextCompletedItemsCounter;;
  }

  getNextState = (nextTaskList) => {
    const {
      nextItemsCounter,
      nextActiveItemsCounter,
      nextCompletedItemsCounter
    } = this.getNextCounters(nextTaskList);

    const nextIsAllCompletedTasks = 
      this.getNextIsAllCompletedTasks(nextItemsCounter, nextCompletedItemsCounter);

    return {
      nextItemsCounter,
      nextActiveItemsCounter,
      nextCompletedItemsCounter,
      nextIsAllCompletedTasks
    }
  }

  updateState = (nextTaskList, nextNotificationStatus) => {
    const nextState = this.getNextState(nextTaskList);

    const {
      nextItemsCounter,
      nextActiveItemsCounter,
      nextCompletedItemsCounter,
      nextIsAllCompletedTasks
    } = nextState;

    this.setState({
      taskList: nextTaskList,
      itemsCounter: nextItemsCounter,
      activeItemsCounter: nextActiveItemsCounter,
      completedItemsCounter: nextCompletedItemsCounter,
      isAllCompletedTasks: nextIsAllCompletedTasks,
      notificationStatus: nextNotificationStatus
    });
  }

  hasCompletedTasks() {
    return Boolean(this.state.completedItemsCounter);
  }

  isEmptyTaskList() {
    return !Boolean(this.state.itemsCounter);
  }



  handleAddTaskChange = async (taskDescription) => {
    // const addTaskResponse = await TodoRequests.addTask(this.state.userId, taskDescription);
    
    // if (addTaskResponse.status >= 200 && addTaskResponse.status < 300) {
    //   const getTaskListResponse = await TodoRequests.getTaskList(this.state.userId);

    //   if (getTaskListResponse.status >= 200 && getTaskListResponse.status < 300) {
        
    //   }
    // }
    const addTaskResponse = await TodoRequests.addTask(this.state.userId, taskDescription);

    if (addTaskResponse.data !== undefined) {
      const response = await TodoRequests.getTaskList(this.state.userId);
      this.updateState(response.data, successfullyNotificationMap.get(0));
    } else {
      this.setState({
        notificationStatus: addTaskResponse.toString()
      });
    }
  }


  handleRemoveTaskChange = async (taskId) => {
    await TodoRequests.removeTask(this.state.userId, taskId);
    const response = await TodoRequests.getTaskList(this.state.userId);

    this.updateState(response.data, successfullyNotificationMap.get(1));
  }


  handleChangeTaskMarkChange = async (taskId) => {
    let {taskList} = this.state;
    let isDone = null;

    taskList.forEach((task) => {
      if (task.id === taskId) isDone = !task.isDone;
    });

    if (isDone != null) {
      await TodoRequests.changeTaskMark(this.state.userId, taskId, isDone);
      const response = await TodoRequests.getTaskList(this.state.userId);
    
      this.updateState(response.data, successfullyNotificationMap.get(2));
    }
  }


  handleChangeFilterChange = (filterStatus) => {
    this.setState({
      filter: filterStatus,
      notificationStatus: successfullyNotificationMap.get(3)
    });
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

    await TodoRequests.removeCompletedTasks(this.state.userId, taskIds);
    const response = await TodoRequests.getTaskList(this.state.userId);
    
    this.updateState(response.data, successfullyNotificationMap.get(4));
  }


  handleChangeAllTaskMarksChange = async () => {
    await TodoRequests.changeAllTaskMarks(this.state.userId, !this.state.isAllCompletedTasks);
    const response = await TodoRequests.getTaskList(this.state.userId);
    
    this.updateState(response.data, successfullyNotificationMap.get(5));
  }


  handleChangeTaskDescriptionChange = async (taskId, taskDescription) => {
    await TodoRequests.changeTaskDescription(
      this.state.userId,
      taskId,
      taskDescription.trim()
    );

    const response = await TodoRequests.getTaskList(this.state.userId);
    
    this.updateState(response.data, successfullyNotificationMap.get(6));
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
