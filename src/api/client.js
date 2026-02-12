import axios from 'axios';
//공통 axios 생성
const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  // || 'http://54.180.25.65:3001/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default client;