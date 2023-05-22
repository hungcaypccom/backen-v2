import axios from "axios";
import { BaseURL } from "config";

export const authInstance = axios.create({
  baseURL: BaseURL,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
    "content-type": "application/json",
  },
});

export const userInstance = axios.create({
  baseURL: BaseURL,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
    "content-type": "application/json",
    "withCredentials": true
  },
});
