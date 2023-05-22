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

export const downloadFileApi = async (fileId: string): Promise<any> => {
  const token = localStorage.getItem(TOKEN_KEY);
  const url = "/users/download-file";
  return userInstance.post(url, fileId, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

export const deleteFileApi = async (fileId: string): Promise<any> => {
  const token = localStorage.getItem(TOKEN_KEY);
  const url = "/users/delete-file";
  return userInstance.post(url, fileId, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};
