import controller from './controller';

const api = {};

api.userApi = {
  isAuth() {
    return controller.get('authentification');
  },

  getEmail() {
    return controller.get('email');
  },

  signup(email, password) {
    controller.post('signup', { email, password }).then(() => {
      window.location = '/authorization';
    });
  },

  signin(email, password) {
    controller.post('signin', { email, password }).then(
      (token) => {
        localStorage.setItem('token', token);
        window.location = '/';
      });
  },

  logout() {
    localStorage.removeItem('token');
    window.location = '/authorization';
  }
};

api.taskApi = {
  getTaskList() {
    return controller.get('task-list');
  },

  addTask(taskDescription) {
    return controller.post('create-task', { taskDescription });
  },

  removeTask(taskId) {
    return controller.delete('delete-task', { params: { taskId } });
  },

  changeTaskMark(taskId, isDone) {
    return controller.put('change-task-mark',  { taskId, isDone } );
  },

  removeCompletedTasks(taskIds) {
    return controller.delete('delete-completed-tasks', { params: { taskIds } });
  },

  changeAllTaskMarks(isDone) {
    return controller.put('change-all-task-marks', { isDone });
  },

  changeTaskDescription(taskId, taskDescription) {
    return controller.put('change-task-description', { taskId, taskDescription });
  }
}

export const userApi = api.userApi;
export const taskApi = api.taskApi;
