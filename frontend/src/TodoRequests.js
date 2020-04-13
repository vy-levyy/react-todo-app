import axios from 'axios';
// require('dotenv').config();

// process.env пока что не работает
const SERVER_HOST = 'http://localhost:3001';

class TodoRequests {
  static getTaskList = async (userId) => {
    try {
      const response = await axios.get(`${SERVER_HOST}/task_list`, {
        params: {
          userId
        }
      });

      return response;
    } catch(error) {
      console.log(error);
      return error;
    }
  }


  static addTask = async (userId, taskDescription) => {
    try {
      const response = await axios.post(`${SERVER_HOST}/create_task`, {
        userId,
        taskDescription
      });

      return response;
    } catch(error) {
      console.log(error);
      return error;
    }
  }


  static removeTask = async (userId, taskId) => {
    try {
      const response = await axios.delete(`${SERVER_HOST}/delete_task`, {
        params: {
          userId,
          taskId
        }
      });

      return response;
    } catch(error) {
      console.log(error);
      return error;
    }
  }

  
  static changeTaskMark = async (userId, taskId, isDone) => {
    try {
      const response = await axios.put(`${SERVER_HOST}/change_task_mark`, {
        userId,
        taskId,
        isDone
      });

      return response;
    } catch(error) {
      console.log(error);
      return error;
    }
  }


  static removeCompletedTasks = async (userId, taskIds) => {
    try {
      const response = await axios.delete(`${SERVER_HOST}/delete_completed_tasks`, {
        params: {
          userId,
          taskIds
        }
      });

      return response;
    } catch(error) {
      console.log(error);
      return error;
    }
  }


  static changeAllTaskMarks = async (userId, isDone) => {
    try {
      const response = axios.put(`${SERVER_HOST}/change_all_task_marks`, {
        userId,
        isDone
      });
    
      return response;
    } catch(error) {
      console.log(error);
      return error;
    }
  }

  
  static changeTaskDescription = async (userId, taskId, taskDescription) => {
    try {
      const response = await axios.put(`${SERVER_HOST}/change_task_description`, {
        userId,
        taskId,
        taskDescription
      });

      return response;
    } catch(error) {
      console.log(error);
      return error;
    }
  }
}


export default TodoRequests;
