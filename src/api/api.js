import axios from 'axios';

const api = axios.create({
   baseURL: 'http://34.239.89.57:4000',
   headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
   }
});

api.interceptors.request.use(config => {

   return config;
}, error => {
   return Promise.reject(error);
});

export default api;
