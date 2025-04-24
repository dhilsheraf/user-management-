import axios from 'axios';

export const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api"

const api = axios.create({
    baseURL:`${baseURL}/users`, 
    withCredentials:true
});

export default api;