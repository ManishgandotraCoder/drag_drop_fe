import axios, { AxiosResponse } from "axios";
import resp from "./error.helper";
const API = "https://drag-drop-fe-4wdo.vercel.app";

function _helperaxios(url: string, params: any, method: string) {
  return axios({
    method: method,
    url: API + url,
    data: params,
  })
    .then((response: AxiosResponse) => {
      return resp(
        response?.data?.records,
        response?.status,
        response?.data?.message
      );
    })
    .catch((reason: any) => {
      return resp([], reason?.status, reason?.data?.message);
    });
}
export default _helperaxios;
