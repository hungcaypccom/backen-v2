import { message } from "antd";
import { GetDataParam } from "interface/data";
import {
  deleteFileApi,
  downloadFileApi,
  getDataApi,
  getTotalPageApi,
} from "../api";

export const getDataProxy = async (param: GetDataParam) => {
  try {
    let res = await getDataApi(param);
    if (res.status === 200) {
      return res.data?.detail;
    } else if (res.status == 401) {
      message.destroy();
      message.error("Session expired, login to continue...");
      return false;
    } else if (res.status !== 401) {
      message.destroy();
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
      message.destroy();
      message.error("Session expired, login to continue...");
      return false;
    } else if (res.status !== 401) {
      message.destroy();
      message.error(res.data?.detail);
    }
  } catch (err: any) {}
  return false;
};

export const downloadFileProxy = async (
  input: { uploadTimeStr: string },
  callback: Function,
  loadingFunc: Function
) => {
  try {
    let res = await downloadFileApi(input, callback, loadingFunc);
  } catch (error: any) {}
  return false;
};

export const deleteFileProxy = async (fileId: string | [any]) => {
  try {
    let res = await deleteFileApi(
      Array.isArray(fileId) ? [...fileId] : [fileId]
    );
    console.log("deleteFileProxy", res, res.status);

    if (res.status === 200) {
      message.destroy();
      message.error("Deleted file successfully");
    } else if (res.response.status === 404) {
      message.destroy();
      message.error("File not found");
    } else {
    }
  } catch (err: any) {
    console.log(err);
  }
};
