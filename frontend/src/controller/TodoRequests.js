import axios from 'axios';

const SERVER_HOST = process.env.REACT_APP_SERVER_HOST;

class TodoRequests {
  static getTaskList = async (userId) => {
    try {
      const response = await axios.get(`${SERVER_HOST}/task-list`, {
        params: {
          userId
        }
      });

      return response;
    } catch(error) {
      return error.response;
    }
  }

  static addTask = async (userId, taskDescription) => {
    try {
      const response = await axios.post(`${SERVER_HOST}/create-task`, {
        userId,
        taskDescription
      });

      return response;
    } catch(error) {
      return error.response;
    }
  }

  static removeTask = async (userId, taskId) => {
    try {
      const response = await axios.delete(`${SERVER_HOST}/delete-task`, {
        params: {
          userId,
          taskId
        }
      });

      return response;
    } catch(error) {
      return error.response;
    }
  }

  static changeTaskMark = async (userId, taskId, isDone) => {
    try {
      const response = await axios.put(`${SERVER_HOST}/change-task-mark`, {
        userId,
        taskId,
        isDone
      });

      return response;
    } catch(error) {
      return error.response;
    }
  }

  static removeCompletedTasks = async (userId, taskIds) => {
    try {
      const response = await axios.delete(`${SERVER_HOST}/delete-completed-tasks`, {
        params: {
          userId,
          taskIds
        }
      });

      return response;
    } catch(error) {
      return error.response;
    }
  }

  static changeAllTaskMarks = async (userId, isDone) => {
    try {
      const response = await axios.put(`${SERVER_HOST}/change-all-task-marks`, {
        userId,
        isDone
      });

      return response;
    } catch(error) {
      return error.response;
    }
  }
  
  static changeTaskDescription = async (userId, taskId, taskDescription) => {
    try {
      const response = await axios.put(`${SERVER_HOST}/change-task-description`, {
        userId,
        taskId,
        taskDescription
      });

      return response;
    } catch(error) {
      return error.response;
    }
  }
}

export default TodoRequests;
