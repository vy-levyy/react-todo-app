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
    return controller.post('signup', { email, password }).then((response) => {
      if (response.success) {
        localStorage.setItem('signup', response.message);
        window.location = '/authorization';
      } else {
        return response.message;
      }
    });
  },

  signin(email, password) {
    return controller.post('signin', { email, password }).then((response) => {
      if (response.success) {
        localStorage.setItem('token', response.token);
        window.location = '/';
      } else {
        return response.message;
      }
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
