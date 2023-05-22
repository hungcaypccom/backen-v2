import { TOKEN_KEY } from "config";
import { GetDataParam } from "interface/data";
import { PasswordStruct, UserProfile } from "interface/user";
import { userInstance } from "./instance";

export const getUserProfileApi = async (): Promise<any> => {
  const token = localStorage.getItem(TOKEN_KEY);
  const url = "/users";
  return userInstance.get(url, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

export const editUserProfileApi = async (param: UserProfile): Promise<any> => {
  const token = localStorage.getItem(TOKEN_KEY);
  const url = "/users/edit-profile";
  return userInstance.post(url, param, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

export const editUserPasswordApi = async (
  param: PasswordStruct
): Promise<any> => {
  const token = localStorage.getItem(TOKEN_KEY);
  const url = "/users/change-password";
  return userInstance.post(url, param, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};
