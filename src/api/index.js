import axios from "axios";
// import { config } from "vue/types/umd";

const request = axios.create({
  baseURL: "http://127.0.0.1:3000",
  // timeout: timeout
  // headers: headers
});

request.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么
    const mytoken = localStorage.getItem("token");
    config.headers.author = mytoken;
    return config;
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

export default request;
