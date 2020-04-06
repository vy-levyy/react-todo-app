import React from 'react';
import Logo from '../Logo.jsx';
import TodoHeader from '../TodoHeader/TodoHeader.jsx';
import List from '../List.jsx';
import TodoFooter from '../TodoFooter/TodoFooter.jsx';
import TodoNotificationList from '../TodoNotificationList/TodoNotificationList.jsx';
import './TodoApp.css';


const successfullyNotificationMap = new Map([
  [0, 'Task added successfully!'],
  [1, 'Task removed successfully!'],
  [2, 'Task mark changed successfully!'],
  [3, 'Filter changed successfully!'],
  [4, 'Completed tasks removed successfully!'],
  [5, 'Task list mark changed successfully!'],
  [6, 'Task description changed successfully!'],
]);


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


  getTaskList(filter) {
    const {taskList} = this.state;

    return taskList.filter((task) => {
      if (filter === 'All') return true;
      if (filter === 'Active' && !task.isDone) return true;
      if (filter === 'Completed' && task.isDone) return true;

      return false;
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
      return task.isDone ? false : true;
    });

    this.setState({taskList});
    this.updateStates();
    this.setNotificationStatus(successfullyNotificationMap.get(4));
  }

  handleChangeAllTaskMarksChange = () => {
    let {taskList} = this.state;
    const {isAllCompletedTasks} = this.state;

    if (isAllCompletedTasks) {
      taskList = taskList.map((task) => {
        task.isDone = false;
        return task;
      });
    } else {
      taskList = taskList.map((task) => {
        task.isDone = true;
        return task;
      });
    }

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



  render() {
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
            {todoFooter}
          </div>
        </div>
      </div>
    );
  }
}

export default TodoApp;
