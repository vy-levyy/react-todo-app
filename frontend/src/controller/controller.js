import axios from 'axios';

const controller = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 30000,
  headers: { 'X-Access-Token': localStorage.getItem('token') }
});

controller.interceptors.request.use((config) => {
  switch (config.url) {
    case 'authentification':
      if (window.location !== '/') {
        // cancel request
      }
      break;
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
  switch (response.config.url) {
    case 'authentification':
      return true;
    case 'email':
      return response.data.email;
    case 'signin':
      return response.data.accessToken;
    case 'task-list':
      return response.data;
    default:
      break;
  }

  return response;

}, (error) => {
  if (error.response && error.response.status) {
    switch (error.response.status) {
      case 400:
        // fall through
      case 401:
        // fall through
      case 403:
        // fall through
      case 404:
        console.log(error.response);
        return error.response.data.message;
      default:
        console.log({ error })
        return 'Unknown error';
    }
  }

  console.log({ error })
  return Promise.reject(error);
});

export default controller;
