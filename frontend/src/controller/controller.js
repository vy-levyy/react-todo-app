import axios from 'axios';
import successfulNotificationMap from '../javaScript/successfulNotificationMap';

const controller = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 30000,
  headers: { 'X-Access-Token': localStorage.getItem('token') }
});

controller.interceptors.request.use((config) => {
  switch (config.url) {
    case 'signin':
      // fall through
    case 'signup':
      config.headers['X-Access-Token'] = null;
      break;
    default:
      break;
  }

  return config;
});

controller.interceptors.response.use((response) => {
  if (!response.config) {
    return response;
  }

  switch (response.config.url) {
    case 'authentification':
      return {
        success: true
      };
    case 'email':
      return response.data.email;
    case 'signin':
      return {
        success: true,
        token: response.data.accessToken
      };
    case 'task-list':
      return {
        success: true,
        taskList: response.data
      }
    default:
      return {
        success: true,
        message: successfulNotificationMap.get(response.config.url)
      }
  }

}, (error) => {
  if (error.response && error.response.status) {
    switch (error.response.status) {
      case 400:
        console.log(error.response);

        switch (error.response.config.url) {
          case 'signup':
            // fall through
          case 'signin':
            return {
              success: false,
              message: error.response.data.message
            };
          default:
            const statusText = error.response.statusText;
            const action = error.response.config.url.split('-').join(' ');
    
            return {
              success: false,
              message: `${statusText} of '${action}' action`
            };
        }
      case 401:
        if (error.response.config.url === 'signin') {
          console.log(error.response);

          return {
            success: false,
            message: error.response.data.message
          };
        }
        // fall through
      case 403:
        // fall through
      case 404:
        // fall through
      case 500:
        console.log(error.response);

        return {
          success: false,
          message: error.response.statusText
        };
      default:
        console.log({ error })
        return {
          success: false,
          message: 'Unknown error'
        };
    }
  }

  console.log({ error })
  return {
    success: false,
    message: error.message
  };
});

export default controller;
