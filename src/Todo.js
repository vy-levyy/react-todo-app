/* eslint-disable array-callback-return */
class Todo {
  constructor() {
    this.tasks = [];
  }

  static lastId = 0;

  addTask(description, isDone = false) {
    this.tasks.push({
      id: Todo.lastId,
      description,
      isDone
    });

    Todo.lastId += 1;
  }

  completeTask(id) {
    this.tasks.map((task) => {
      if (task.id === id) {
        task.isDone = true;
      }
    });
  }

  uncompleteTask(id) {
    this.tasks.map((task) => {
      if (task.id === id) {
        task.isDone = false;
      }
    });
  }

  removeTask(id) {
    this.tasks.map((task, index, tasks) => {
      if (task.id === id) {
        tasks.splice(index, 1);
      }
    });
  }

  changeTaskDescription(id, description) {
    this.tasks.map((task) => {
      if (task.id === id) {
        task.description = description;
      }
    });
  }

  removeDoneTasks() {
    this.tasks = this.tasks.filter((task) => {
      if (!task.isDone) {
        return task;
      }
    });
  }

  markTasksAsDone() {
    this.tasks.map((task) => {
      task.isDone = true;
    });
  }

  markTasksAsNotDone() {
    this.tasks.map((task) => {
      task.isDone = false;
    });
  }

  getTasks() {
    return this.tasks;
  }

  getActiveTasks() {
    return this.tasks.filter((task) => {
      if (task.isDone === false) {
        return task;
      }
    });
  }

  getCompletedTasks() {
    return this.tasks.filter((task) => {
      if (task.isDone === true) {
        return task;
      }
    });
  }

  getActiveTasksCount() {
    const tempTasks = this.tasks.filter((task) => {
      if (task.isDone === false) {
        return task;
      }
    });

    return tempTasks.length;
  }

  isEmpty() {
    return !Boolean(this.tasks.length);
  }

  isAllTasksCompleted() {
    if (this.getTasks().length === this.getCompletedTasks().length) {
      return true;
    }

    return false;
  }
}

export default Todo;