import { loginApi } from "api/auth";
import { LoginInput } from "interface/auth";

export const loginProxy = async (loginInput: LoginInput) => {
  let loginData = {
    username: loginInput.username,
    password: loginInput.password,
  };
  let loginJSON = JSON.stringify(loginData);

  let res = await loginApi(loginJSON);
  return res;
};
