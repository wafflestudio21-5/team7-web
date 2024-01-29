import axios from "axios";
import { baseURL } from "../Constants";

export function getCafeInfo() {
  return axios.get(baseURL + "/api/v1/cafe-info");
}
