import { message } from "antd";
import axios from "axios";
import { BaseURL, BaseURLLocal } from "config";
import { redirect } from "react-router-dom";


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

export const downloadInstance = axios.create({
  baseURL: BaseURL,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
    // 'Content-Type': 'application/zip',
    // "Accept": 'application/zip',
    // "content-type": "application/zip",

        "withCredentials": true
  },
});


