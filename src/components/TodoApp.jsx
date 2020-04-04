import React from 'react';
import Logo from './Logo.jsx';
import TodoHeader from './TodoHeader.jsx';
import List from './List.jsx';
import TodoFooter from './TodoFooter.jsx';


class TodoApp extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      taskList: [],
      activeItemsCounter: 0,
      isAllCompletedTasks: false,
      filter: 'All',
    };
    //TODO что бы избаваить от этой горы привязок this лучше использовать стрелочные функции.
    // https://learn.javascript.ru/arrow-functions-basics подробно про них можно почитать тут
    this.handleAddTaskChange = this.handleAddTaskChange.bind(this);
    this.handleChangeTaskMarkChange = this.handleChangeTaskMarkChange.bind(this);
    this.handleRemoveTaskChange = this.handleRemoveTaskChange.bind(this);
    this.handleChangeFilterChange = this.handleChangeFilterChange.bind(this);
    this.handleRemoveCompletedTasksChange = this.handleRemoveCompletedTasksChange.bind(this);
    this.handlerChangeAllTaskMarksChange = this.handlerChangeAllTaskMarksChange.bind(this);
    this.handleChangeTaskDescriptionChange = this.handleChangeTaskDescriptionChange.bind(this);
  }

  static lastId = 0;

  handleAddTaskChange(description) {

    //TODO можно заменить вот такой строкой: const { taskList } = this.state;
    // Аналогично в переменной taskList окажется копия массива из стейта taskList
    // https://learn.javascript.ru/destructuring тут можно подробнее посмотретьк как это работает
    const taskList = this._copyTaskList();

    taskList.push({
      id: TodoApp.lastId,
      description,
      isDone: false,
    });
    // TODO не совсем понимаю зачем .slice(), нужен ли он?
    this.setState( {
      taskList: taskList.slice()
    });

    TodoApp.lastId += 1;
    // TODO можно объеденить эти две функции в одну, в каждой идет перебор одного и того же массива
    this.updateActiveItemsCounter();
    this.updateIsAllCompletedTasks();
  }


  handleRemoveTaskChange(id) {
    let itemNumber;
    // TODO так лучше не делать, случайно можно мутировать значение в стейт, лучше достать массив в переменную и к переменной применять map
    let taskList = this.state.taskList.map((task, index) => {
      if (task.id === id) itemNumber = index;
      return task;
    });

    taskList.splice(itemNumber, 1)

    this.setState({
      taskList: taskList.slice()
    });

    this.updateActiveItemsCounter();
    this.updateIsAllCompletedTasks();
  }


  updateActiveItemsCounter() {
    this.setState((state) => {
      let counter = 0;

      state.taskList.map((task) => {
        if (!task.isDone) counter += 1;
        return task;
      });

      return {activeItemsCounter: counter}
    });
  }


  handleChangeTaskMarkChange(id) {
    let taskList = this.state.taskList.map((task) => {
      if (task.id === id) task.isDone = !task.isDone;
      return task;
    });

    this.setState({
      taskList: taskList.slice()
    });

    this.updateActiveItemsCounter();
    this.updateIsAllCompletedTasks();
  }


  isEmptyTaskList() {
    return !Boolean(this.state.taskList.length);
  }

  handleChangeFilterChange(filterStatus) {
    this.setState({
      filter: filterStatus
    });
  }

  getTaskList(filter) {
    return this.state.taskList.filter((task) => {
      if (filter === 'All') return true;
      if (filter === 'Active' && !task.isDone) return true;
      if (filter === 'Completed' && task.isDone) return true;

      return false;
    });
  }

  hasCompletedTasks() {
    let hasCompletedTasks = false;

    this.state.taskList.map((task) => {
      if (task.isDone) hasCompletedTasks = true;
      return task;
    });

    return hasCompletedTasks;
  }

  handleRemoveCompletedTasksChange() {
    let taskList = this.state.taskList.filter((task) => {
      if (task.isDone) {
        return false;
      }

      return true;
    });

    this.setState({
      taskList: taskList.slice()
    });

    this.updateIsAllCompletedTasks();
  }

  _copyTaskList() {
    return this.state.taskList.slice();
  }

  updateIsAllCompletedTasks() {
    //TODO я бы вынес логику расчета стейтов над this.setState, а в самом this.setState уже назначал только значения сейтов
    // из полученных перменных
    this.setState((state) => {
      let allTaskCount = 0;
      let completedTaskCount = 0;

      state.taskList.map((task) => {
        allTaskCount += 1;

        if (task.isDone) {
          completedTaskCount += 1;
        }

        return task;
      });


      let isAllCompletedTasks = false;

      if (allTaskCount !== 0) {
        if (allTaskCount === completedTaskCount) {
          isAllCompletedTasks = true;
        }
      }

      return {isAllCompletedTasks};
    });
  }


  handlerChangeAllTaskMarksChange() {
    let taskList = this.state.taskList;

    if (this.state.isAllCompletedTasks) {
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

    this.setState({
      taskList: taskList.slice()
    });

    this.updateActiveItemsCounter();
    this.updateIsAllCompletedTasks();
  }


  handleChangeTaskDescriptionChange(id, description) {

    if (description.trim() !== '') {
      let taskList = this.state.taskList.map((task) => {
        if (task.id === id) {
            task.description = description;
        }

        return task;
      });

      this.setState({
        taskList: taskList.slice()
      });
    } else {
      this.handleRemoveTaskChange(id);
    }
  }



  render() {
    let todoFooter = '';

    if (!this.isEmptyTaskList()) {
      todoFooter = (
        <TodoFooter
          activeItemsCounter={this.state.activeItemsCounter}
          filter={this.state.filter}
          handleChangeFilterChange={this.handleChangeFilterChange}
          shouldShowClearCompletedItemsButton={this.hasCompletedTasks()}
          handleRemoveCompletedTasksChange={this.handleRemoveCompletedTasksChange}
        />
      );
    }

    return (
      <div>
        <Logo />
        <TodoHeader
          handleAddTaskChange={this.handleAddTaskChange}
          shouldShowListStatusCheckbox={!this.isEmptyTaskList()}
          shouldActiveListStatusCheckbox={this.state.isAllCompletedTasks}
          handlerChangeAllTaskMarksChange={this.handlerChangeAllTaskMarksChange}
        />
        <List
          taskList={this.getTaskList(this.state.filter)}
          handleChangeTaskMarkChange={this.handleChangeTaskMarkChange}
          handleRemoveTaskChange={this.handleRemoveTaskChange}
          handleChangeTaskDescriptionChange={this.handleChangeTaskDescriptionChange}
        />
        {todoFooter}
      </div>
    );
  }
}

export default TodoApp;
