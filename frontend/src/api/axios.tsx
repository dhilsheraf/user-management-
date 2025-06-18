import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080/api/admin',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to dynamically set the token
instance.interceptors.request.use(
  (config) => {
    // Get the token fresh from localStorage for each request
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
