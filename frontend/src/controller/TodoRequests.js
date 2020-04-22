import axios from 'axios';

const SERVER_HOST = process.env.REACT_APP_SERVER_HOST;

function getToken() {
  return localStorage.getItem('token');
}

function hasToken() {
  return Boolean(getToken());
}

class TodoRequests {
  static authentification = async () => {
    try {
      if (!hasToken()) {
        throw new Error('no token');
      }

      const response = await axios.get(`${SERVER_HOST}/authentification`, {
        headers: {
          'X-Access-Token': getToken()
        }
      });

      return response;
    } catch(error) {
      return error.response || error;
    }
  }

  static getTaskList = async () => {
    try {
      if (!hasToken()) {
        throw new Error('no token');
      }

      const response = await axios.get(`${SERVER_HOST}/task-list`, {
        headers: {
          'X-Access-Token': getToken()
        }
      });
      return response;
    } catch(error) {
      return error.response || error;
    }
  }

  static addTask = async (taskDescription) => {
    try {
      if (!hasToken()) {
        throw new Error('no token');
      }

      const response = await axios({
        method: 'post',
        url: `${SERVER_HOST}/create-task`,
        headers: { 'X-Access-Token': getToken() },
        data: { taskDescription }
      });

      return response;
    } catch(error) {
      return error.response || error;
    }
  }

  static removeTask = async (taskId) => {
    try {
      if (!hasToken()) {
        throw new Error('no token');
      }

      const response = await axios({
        method: 'delete',
        url: `${SERVER_HOST}/delete-task`,
        headers: { 'X-Access-Token': getToken() },
        params: { taskId }
      });

      return response;
    } catch(error) {
      return error.response || error;
    }
  }

  static changeTaskMark = async (taskId, isDone) => {
    try {
      if (!hasToken()) {
        throw new Error('no token');
      }

      const response = await axios({
        method: 'put',
        url: `${SERVER_HOST}/change-task-mark`,
        headers: { 'X-Access-Token': getToken() },
        data: {
          taskId,
          isDone
        }
      });

      return response;
    } catch(error) {
      return error.response || error;
    }
  }

  static removeCompletedTasks = async (taskIds) => {
    try {
      if (!hasToken()) {
        throw new Error('no token');
      }

      const response = await axios({
        method: 'delete',
        url: `${SERVER_HOST}/delete-completed-tasks`,
        headers: { 'X-Access-Token': getToken() },
        params: { taskIds }
      });

      return response;
    } catch(error) {
      return error.response || error;
    }
  }

  static changeAllTaskMarks = async (isDone) => {
    try {
      if (!hasToken()) {
        throw new Error('no token');
      }

      const response = await axios({
        method: 'put',
        url: `${SERVER_HOST}/change-all-task-marks`,
        headers: { 'X-Access-Token': getToken() },
        data: { isDone }
      });

      return response;
    } catch(error) {
      return error.response || error;
    }
  }
  
  static changeTaskDescription = async (taskId, taskDescription) => {
    try {
      if (!hasToken()) {
        throw new Error('no token');
      }

      const response = await axios({
        method: 'put',
        url: `${SERVER_HOST}/change-task-description`,
        headers: { 'X-Access-Token': getToken() },
        data: {
          taskId,
          taskDescription
        }
      });

      return response;
    } catch(error) {
      return error.response || error;
    }
  }
}

export default TodoRequests;
