import React from 'react';
import Logo from '../Logo/Logo.jsx';
import TodoHeader from '../TodoHeader/TodoHeader.jsx';
import List from '../List/List.jsx';
import TodoFooter from '../TodoFooter/TodoFooter.jsx';
import TodoNotificationList from '../TodoNotificationList/TodoNotificationList.jsx';

import TodoHandlers from '../../TodoHandlers';
import TodoRequests from '../../TodoRequests';

import './style.css';



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



  componentDidMount = () => {
    this.updateTaskList();
  }


  
  handleAddTaskChange = (taskDescription) => {
    TodoHandlers.handleAddTaskChange.call(this, taskDescription);
  }

  handleRemoveTaskChange = (taskId) => {
    TodoHandlers.handleRemoveTaskChange.call(this, taskId);
  }

  handleChangeTaskMarkChange = (taskId) => {
    TodoHandlers.handleChangeTaskMarkChange.call(this, taskId);
  }

  handleChangeFilterChange = (filterStatus) => {
    TodoHandlers.handleChangeFilterChange.call(this, filterStatus);
  }

  handleRemoveCompletedTasksChange = () => {
    TodoHandlers.handleRemoveCompletedTasksChange.call(this);
  }

  handleChangeAllTaskMarksChange = () => {
    TodoHandlers.handleChangeAllTaskMarksChange.call(this);
  }

  handleChangeTaskDescriptionChange = (taskId, taskDescription) => {
    TodoHandlers.handleChangeTaskDescriptionChange.call(this, taskId, taskDescription);
  }



  updateTaskList = async () => {
    const response = await TodoRequests.getTaskList(this.state.userId);
    const nextTaskList = response.data;

    if (response.status === 200) {
      this.updateStateOn(nextTaskList);
    } else {
      this.setState({
        // пока не реализована овторизация и деление на других юзеров
        // ошибка Not Found не передается
        notificationStatus: null
      });

      this.updateStateOn([]);
    }
  }
  
  updateStateOn = (nextTaskList) => {
    const nextState = this.getNextStateOn(nextTaskList);

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
      notificationStatus: null
    });
  }
  
  getNextStateOn = (nextTaskList) => {
    const {
      nextItemsCounter,
      nextActiveItemsCounter,
      nextCompletedItemsCounter
    } = this.getNextCountersOn(nextTaskList);

    const nextIsAllCompletedTasks = 
      this.getNextIsAllCompletedTasksOn(nextItemsCounter, nextCompletedItemsCounter);

    return {
      nextItemsCounter,
      nextActiveItemsCounter,
      nextCompletedItemsCounter,
      nextIsAllCompletedTasks
    }
  }

  getNextCountersOn = (nextTaskList) => {
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

  getNextIsAllCompletedTasksOn (nextItemsCounter, nextCompletedItemsCounter) {
    return nextItemsCounter !== 0 && nextItemsCounter === nextCompletedItemsCounter;;
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

  hasCompletedTasks() {
    return Boolean(this.state.completedItemsCounter);
  }

  isEmptyTaskList() {
    return !Boolean(this.state.itemsCounter);
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
