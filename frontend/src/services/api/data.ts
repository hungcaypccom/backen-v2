import { TOKEN_KEY } from "config";
import { GetDataParam } from "interface/data";
import { userInstance } from "./instance";
import { httpApi } from "./mock/http.api.mock";

export const getDataApi = async (param: GetDataParam): Promise<any> => {
  const url = "/users/get-infoData-by-username";
  return userInstance.get(url, {
    params: param,
  });
};

export const getTotalPageApi = async (param: {[key: string]: boolean}): Promise<any> => {
  const url = "/users/get-total-infoData-by-accountNo";
  return userInstance.get(url, {
    params: param,
  });
};

export const downloadFileApi = async (uploadTimeStr:any): Promise<any> => {
  const url = "/users/download-file";
  return userInstance.get(url, { params: uploadTimeStr });
};

export const deleteFileApi = async (fileId: string | [any]): Promise<any> => {
  const url = "/users/delete-file";
  let data = JSON.stringify(fileId)
  return userInstance.post(url, data);
};
