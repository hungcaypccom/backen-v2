import { PasswordStruct, UserProfile } from "interface/user";
import {
  editUserPasswordApi,
  editUserProfileApi,
  getUserProfileApi,
} from "../api";
import { message } from "antd";

export const getUserProfileProxy = async () => {
  try {
    let res = await getUserProfileApi();
    if (res.status === 200) {
      return res.data?.detail;
    } else {
      return {};
    }
  } catch (err:any) {
    message.error(err.message)
  }
};

export const editUserProfileProxy = async (param: UserProfile) => {
  try {
    let res = await editUserProfileApi(param);
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

export const editUserPasswordProxy = async (param: PasswordStruct) => {
  try {
    let res = await editUserPasswordApi(param);
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
