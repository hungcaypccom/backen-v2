import { GetDataParam } from "interface/data";
import {
  deleteFileApi,
  downloadFileApi,
  getDataApi,
  getUserProfileApi,
} from "../api";

export const getDataProxy = async (param: GetDataParam) => {
  let res = await getDataApi(param);
  if (res.status === 200) {
    return res.data.result;
  } else {
    return [];
  }
};

export const downloadFileProxy = async (fileId: string) => {
  let res = await downloadFileApi(fileId);
  if (res.status === 200) {
    return res.data.result;
  } else {
    return null;
  }
};

export const deleteFileProxy = async (fileId: string) => {
  let res = await deleteFileApi(fileId);
  if (res.status === 200) {
    return res.data.result;
  } else {
    return null;
  }
};
