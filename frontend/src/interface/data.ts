export interface Data {
  modified_at: string;
  id: string;
  uploadTimeStr: string;
  createTime: string;
  birthday: string;
  sex: "Female" | "Male";
  downloadable: boolean;
  accountNo: string;
  created_at: string;
  fileSize: string;
  name: string;
  phone: string;
  status: boolean;
  user_id: string;
}

export interface GetDataParam {
  downloadable: boolean;
  page: number;
  count: number;
}
