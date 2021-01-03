import axios from "axios";

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    config.headers = {
      Authorization: `Bearer ${window.localStorage.getItem("key")}`,
    };
    config.baseURL = "http://localhost:8081";
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axios;
