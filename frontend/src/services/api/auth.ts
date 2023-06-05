import { authInstance } from "./instance";

export const loginApi = (input: string): Promise<any> => {
  return authInstance.post("auth/login", input);
};

export const logoutApi = (): Promise<any> => {
  return authInstance.get("auth/logout");
};

export const createAccounttApi = (input: any): Promise<any> => {
  const objectKeys = Object.keys(input);
  const data = new FormData();
  for (let key of objectKeys) {
    data.append(key, input[key]);
  }

  return authInstance.post("user/create", data);
};
