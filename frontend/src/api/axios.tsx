import axios from 'axios';

const token = localStorage.getItem('adminToken');

const instance = axios.create({
  baseURL: 'http://localhost:8080/api/admin',
  headers: {
    'Content-Type': 'application/json',
    Authorization: token ? `Bearer ${token}` : '',
  },
});

export default instance;
