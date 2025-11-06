import axios from 'axios';
export const api = axios.create({
  baseURL: 'https://api.github.com/', // Em um projeto real eu usaria uma variável de ambiente para a URL da API
  timeout: 10000,
});