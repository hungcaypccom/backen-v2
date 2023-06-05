import AxiosMockAdapter from "axios-mock-adapter";
import axios from "axios";

export const httpApi = axios.create({
  baseURL: "http://localhost:3000",
});

export const httpApiMock = new AxiosMockAdapter(httpApi);

httpApiMock.onGet("/").reply(() => {
  return [
    200,
    {
      status: 1,
      data: [
        {
          id: "gt5dfifngv",
          name: "luan",
          birthday: "1997-10-22",
          tel: "123453267",
          created_date: Date.now(),
          is_downloaded: false,
        },
        {
          id: "s45dfifnvv",
          name: "toan",
          birthday: "1989-10-24",
          tel: "123425567",
          created_date: Date.now() - 136433,
          is_downloaded: true,
        },
        {
          id: "s232oifnvv",
          name: "hung",
          birthday: "2002-12-24",
          tel: "123451267",
          created_date: Date.now() - 13643,
          is_downloaded: true,
        },
      ],
    },
  ];
});
