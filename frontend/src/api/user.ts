import { TOKEN_KEY } from "config";
import { GetDataParam } from "interface/data";
import { PasswordStruct, UserProfile } from "interface/user";
import { userInstance } from "./instance";

export const getUserProfileApi = async (): Promise<any> => {
  const token = localStorage.getItem(TOKEN_KEY);
  const url = "/users/get-user";
  return userInstance.get(url);
};

export const editUserProfileApi = async (param: UserProfile): Promise<any> => {
  const url = "/users/update-user";
  return userInstance.post(url, param);
};

export const editUserPasswordApi = async (
  param: PasswordStruct
): Promise<any> => {
  const token = localStorage.getItem(TOKEN_KEY);
  const url = "/users/update-password";
  return userInstance.post(url, param, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};
