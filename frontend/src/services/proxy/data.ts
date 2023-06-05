import { GetDataParam } from "interface/data";
import {
  deleteFileApi,
  downloadFileApi,
  getDataApi,
  getTotalPageApi,
  getUserProfileApi,
} from "../api";
import { message } from "antd";

export const getDataProxy = async (param: GetDataParam) => {
  try {
    let res = await getDataApi(param);
    if (res.status === 200) {
      return res.data?.detail;
    } else {
      message.error(res.data?.detail)
      return [];
    }
  } catch (err:any) {
    message.error(err.message)
  }
};

export const getTotalPageProxy = async (param: any) => {
  try {
    let res = await getTotalPageApi(param);
    if (res.status === 200) {
      return res.data?.detail;
    } else {
      message.error(res.data?.detail)
    }
  } catch (err:any) {
    message.error(err.message)
  }
  return false;
};

export const downloadFileProxy = async (fileId: any) => {
  try {
    console.log("downloading file " + fileId);
    
    let res = await downloadFileApi(fileId);
    if (res.status === 200) {
      const contentDisposition = res.headers['content-disposition'];
      const contentType = res.headers['content-type'];

      const url = window.URL.createObjectURL(new Blob([res.data],
        { type: contentType }));      
      const filename = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/)[1];
      // create "a" HTML element with href to file & click
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${filename}`); //or any other extension
      document.body.appendChild(link);
      link.click();
  
      // clean up "a" element & remove ObjectURL
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } 
  } catch (error:any) {
    message.error(error.message)
    console.log(error.message);
  }
 
    return false;
  
};

export const deleteFileProxy = async (fileId: string | [any]) => {
  try {
    let res = await deleteFileApi(Array.isArray(fileId) ? [...fileId]: [fileId]);
    if (res.status === 200) {
      return res.data?.detail;
    } else {
      message.error(res.data?.detail)
      return false;
    }
  } catch (err:any) {
    message.error(err.message)
  }
};
