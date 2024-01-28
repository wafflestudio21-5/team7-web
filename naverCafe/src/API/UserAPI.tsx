import axios from "axios";
import { baseURL } from "../Constants";

export function signup(userInfo: {
  username: string;
  password: string;
  name: string;
  email: string;
  birthDate: string;
  phoneNumber: string;
}) {
  return axios.post(baseURL + "/api/v1/signup", userInfo);
}
export function login(userInfo: { username: string; password: string }) {
  return axios.post(baseURL + "/api/v1/signin", userInfo);
}
