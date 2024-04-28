import axios from 'axios';

const adminApi = axios.create({});

adminApi.interceptors.request.use(function (config) {
  console.log('Request Sent');
  const token = localStorage.getItem('mern_admin_dashboard');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default adminApi;
