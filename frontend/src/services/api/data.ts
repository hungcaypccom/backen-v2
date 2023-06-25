import { TOKEN_KEY } from "config";
import { GetDataParam } from "interface/data";
import { downloadInstance, userInstance } from "./instance";
import { httpApi } from "./mock/http.api.mock";
import { saveAs } from "file-saver";
import { message } from "antd";

export const getDataApi = async (param: GetDataParam): Promise<any> => {
  const url = "/users/get-infoData-by-username";
  return userInstance.get(url, {
    params: param,
  });
};

export const getTotalPageApi = async (param: {downloadable: boolean, filter:string}): Promise<any> => {
  const url = "/users/get-total-infoData-by-accountNo";
  return userInstance.get(url, {
    params: param,
  });
};

export const downloadFileApi = async (uploadTimeStr:any, callback: Function): Promise<any> => {
  try {
    const url = "/api/users/download-file?uploadTimeStr=" + uploadTimeStr.uploadTimeStr;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = "blob";
    xhr.withCredentials = true;
    xhr.onreadystatechange = function (){
        if (xhr.readyState === 4 && xhr.status === 200) {
            var blob = xhr.response;
            var filename = xhr?.getResponseHeader("content-disposition")?.replace(/[\w; ]+filename=/g, "");
            saveAs(blob, filename);
        } else if(xhr.readyState === 4 && xhr.status === 401) {
          message.destroy();
          message.error("Session expired, login to continue");
          callback()
        } else if(xhr.readyState === 4) {
          message.destroy();
          message.error("Failed to download this file, please try again");
        }
    };
    xhr.send();} catch (e) {}
  }

export const deleteFileApi = async (fileId: string | [any]): Promise<any> => {
  const url = "/users/delete-file";
  let data = JSON.stringify(fileId)
  return userInstance.post(url, data);
};
