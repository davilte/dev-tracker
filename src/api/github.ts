import axios from 'axios';
export const api = axios.create({
  baseURL: 'https://api.github.com/', // I would use an environment variable for the API URL in a real project
  timeout: 10000,
});