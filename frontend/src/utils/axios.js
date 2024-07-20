import axios from "axios";

const token = localStorage.getItem('token') || null;
console.log("token",token);
const axiosInstance = axios.create({
    baseURL: `http://localhost:8085/`,
    headers: {
        'Authorization': `Bearer ${token}`,
    }
  });

// Interceptor to add the token to requests
axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token'); 
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  export default axiosInstance;