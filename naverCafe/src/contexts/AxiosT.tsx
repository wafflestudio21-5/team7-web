import axios from "axios";
import { getCookie } from "./Cookie";

const axiosT = axios.create();

axiosT.interceptors.request.use(
  (config) => {
    const accessToken = getCookie("access_token");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
      //console.log('access token');
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosT;
