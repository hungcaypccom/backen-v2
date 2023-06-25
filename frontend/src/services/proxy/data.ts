import { GetDataParam } from "interface/data";
import {
  deleteFileApi,
  downloadFileApi,
  getDataApi,
  getTotalPageApi,
  getUserProfileApi,
} from "../api";
import { message } from "antd";
import { saveAs } from "file-saver";

export const getDataProxy = async (param: GetDataParam) => {
  try {
    let res = await getDataApi(param);
    if (res.status === 200) {
      return res.data?.detail;
    } else if (res.status == 401) {
      message.error("Session expired, login to continue...");
      return false;
    } else if (res.status !== 401) {
      message.error(res.data?.detail);
      return [];
    }
  } catch (err: any) {}
};

export const getTotalPageProxy = async (param: {
  downloadable: boolean;
  filter: string;
}) => {
  try {
    let res = await getTotalPageApi(param);
    if (res.status === 200) {
      return res.data?.detail;
    } else if (res.status == 401) {
      message.error("Session expired, login to continue...");
      return false;
    } else if (res.status !== 401) {
      message.error(res.data?.detail);
    }
  } catch (err: any) {}
  return false;
};

export const downloadFileProxy = async (
  input: { uploadTimeStr: string },
  callback: Function
) => {
  try {
    let res = await downloadFileApi(input, callback);
  } catch (error: any) {}
  return false;
};

export const deleteFileProxy = async (fileId: string | [any]) => {
  try {
    let res = await deleteFileApi(
      Array.isArray(fileId) ? [...fileId] : [fileId]
    );
    console.log("rs.delete", res);

    if (res.status === 200) {
      return res.data?.detail;
    }
  } catch (err: any) {
    if (err.status === 404) {
      message.error("File not found");
    } else if (err.status == 401) {
      message.error("Session expired, login to continue...");
      return false;
    } else {
      message.error("Failed to delete file");
    }
  }
};
