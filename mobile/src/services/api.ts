import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.0.5.220:3333',
});

export default api;
