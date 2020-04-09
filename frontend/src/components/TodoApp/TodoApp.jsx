import React from 'react';
import axios from 'axios';
import Logo from '../Logo/Logo.jsx';
import TodoHeader from '../TodoHeader/TodoHeader.jsx';
import List from '../List/List.jsx';
import TodoFooter from '../TodoFooter/TodoFooter.jsx';
import TodoNotificationList from '../TodoNotificationList/TodoNotificationList.jsx';
import './style.css';
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
    };
  }


  static lastId = 0;

  
  async componentDidMount() {
    const taskList = await this.getUserTaskList();
    console.log(taskList[0]);
  }

  async getUserTaskList() {
    const tempUserId = 1;

    // host потом из .env возьму
    const response = await axios.get('http://localhost:3001/task_list', {
      tempUserId
    });

    return JSON.parse(response.request.response);
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

  updateStates() {
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
  }

  async add() {
    try {
      const res = await axios.post('http://localhost:3001/create', {
        task: 'task'
      });

    } catch(e) {
      console.log(`Ошибочкос: ${e}`);
    }
    // try {
    //   const response = await axios.get('http://localhost:3001/str');
    //   console.log('Returned data: ', response);
    // } catch(e) {
    //   console.log(`Ошибочкос: ${e}`);
    // }
  }

  handleAddTaskChange = (description) => {
    const {taskList} = this.state;

    taskList.push({
      description,
      id: TodoApp.lastId,
      isDone: false,
    });

    this.setState({taskList});

    TodoApp.lastId += 1;
    this.updateStates();
    this.setNotificationStatus(successfullyNotificationMap.get(0));
    this.add();
  }

  handleRemoveTaskChange = (id) => {
    let {taskList} = this.state;
    let itemNumber;

    taskList = taskList.map((task, index) => {
      if (task.id === id) itemNumber = index;
      return task;
    });

    taskList.splice(itemNumber, 1)

    this.setState({taskList});
    this.updateStates();
    this.setNotificationStatus(successfullyNotificationMap.get(1));
  }

  handleChangeTaskMarkChange = (id) => {
    let {taskList} = this.state;

    taskList = taskList.map((task) => {
      if (task.id === id) task.isDone = !task.isDone;
      return task;
    });

    this.setState({taskList});
    this.updateStates();
    this.setNotificationStatus(successfullyNotificationMap.get(2));
  }

  handleChangeFilterChange = (filterStatus) => {
    this.setState({filter: filterStatus});
    this.setNotificationStatus(successfullyNotificationMap.get(3));
  }

  handleRemoveCompletedTasksChange = () => {
    let {taskList} = this.state;

    taskList = taskList.filter((task) => {
      return !task.isDone;
    });

    this.setState({taskList});
    this.updateStates();
    this.setNotificationStatus(successfullyNotificationMap.get(4));
  }

  handleChangeAllTaskMarksChange = () => {
    let {taskList} = this.state;
    const {isAllCompletedTasks} = this.state;

    taskList = taskList.map((task) => {
      task.isDone = !isAllCompletedTasks;
      return task;
    });

    this.setState({taskList});
    this.updateStates();
    this.setNotificationStatus(successfullyNotificationMap.get(5));
  }

  handleChangeTaskDescriptionChange = (id, description) => {
    description = description.trim();

    let {taskList} = this.state;

    taskList = taskList.map((task) => {
      if (task.id === id) {
          task.description = description;
      }

      return task;
    });

    this.setState({taskList});
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
