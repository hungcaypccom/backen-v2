import { PasswordStruct, UserProfile } from "interface/user";
import {
  editUserPasswordApi,
  editUserProfileApi,
  getUserProfileApi,
} from "../api";

export const getUserProfileProxy = async () => {
  let res = await getUserProfileApi();
  if (res.status === 200) {
    return res.data.detail;
  } else {
    return {};
  }
};

export const editUserProfileProxy = async (param: UserProfile) => {
  let res = await editUserProfileApi(param);
  if (res.status === 200) {
    return true;
  } else {
    return false;
  }
};

export const editUserPasswordProxy = async (param: PasswordStruct) => {
  let res = await editUserPasswordApi(param);
  if (res.status === 200) {
    return true;
  } else {
    return false;
  }
};
