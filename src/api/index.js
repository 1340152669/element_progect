import axios from "axios";

const request = axios.create({
  baseURL: "http://127.0.0.1:3000",
  // timeout: timeout
  // headers: headers
});

export default request;
