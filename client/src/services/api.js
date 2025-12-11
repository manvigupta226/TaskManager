import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

// Add auth header automatically
API.interceptors.request.use(config => {
  const t = localStorage.getItem('token');
  if (t) config.headers.Authorization = `Bearer ${t}`;
  return config;
});

export default API;
