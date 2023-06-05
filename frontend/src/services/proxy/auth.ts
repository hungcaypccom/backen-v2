import { message } from "antd";
import { loginApi } from "services/api/auth";
import { LoginInput } from "interface/auth";

export const loginProxy = async (loginInput: LoginInput) => {
  let loginData = {
    username: loginInput.username,
    password: loginInput.password,
  };
  
  try {
    let loginJSON = JSON.stringify(loginData);
    let res = await loginApi(loginJSON);
    if (res.status === 200) {
      return true;
    } else {
      message.error(res.data?.detail)
      return false;
    }
  } catch (err:any) {
    message.error(err.message)
  }
};
