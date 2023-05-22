import { Button, Popconfirm } from "antd";
import Input from "antd/es/input/Input";
import { ColumnsType } from "antd/es/table";
import { Tables } from "components/table/Tables";
import { Data } from "interface/data";
import { deleteFileProxy, downloadFileProxy, getDataProxy } from "proxy/data";
import React, { useEffect, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { useQuery, useMutation } from "@tanstack/react-query";
const Main: React.FC = () => {
  const [search, setSearch] = useState("");
  const getDataTable = async () => {
    const res = await getDataProxy({
      downloadable: true,
      page: 1,
      count: 20,
    });
    return res;
  };

  const dataQuery = useQuery({
    queryKey: ["data"],
    queryFn: getDataTable,
  });

  console.log("dataQuery", dataQuery);

  const handleDownload = async (fileId: string) => {
    let res = await downloadFileProxy(fileId);
  };

  const handleDelete = async (fileId: string) => {
    let res = await deleteFileProxy(fileId);
  };

  const handleSearch = () => {
    // return dataQuery.data.filter((data: Data) => {
    //   return (
    //     data.name.toLowerCase().includes(search) || data.phone.includes(search)
    //   );
    // });
  };

  const columns: ColumnsType<any> = [
    {
      title: "Name",
      dataIndex: "name",
      align: "center",
      width: "15%",
      render: (text: string, record: Data) => <span>{record.name}</span>,
    },
    {
      title: "Birthday",
      dataIndex: "birthday",
      align: "center",
      width: "15%",

      render: (text: string, record: Data) => <span>{record.birthday}</span>,
    },
    {
      title: "Tel",
      dataIndex: "tel",
      align: "center",
      width: "20%",

      render: (text: string, record: Data) => <span>{record.phone}</span>,
    },
    {
      title: "Created at",
      dataIndex: "created_date",
      align: "center",
      width: "15%",

      render: (text: string, record: Data) => <span>{record.created_at}</span>,
    },
    {
      title: "Modified at",
      dataIndex: "modified_at",
      align: "center",
      width: "15%",

      render: (text: string, record: Data) => {
        return <span>{record.modified_at}</span>;
      },
    },
    {
      title: "Action",
      dataIndex: "delete",
      align: "center",
      width: "20%",

      render: (text: string, record: Data) => {
        return (
          <>
            <Button
              disabled={!(record.status && record.downloadable)}
              type="default"
              style={{ marginRight: "10px" }}
              onClick={() => handleDownload(record.uploadTimeStr)}
            >
              Download
            </Button>
            <Popconfirm
              placement="top"
              title="Do you want to delete this record"
              okText="Yes"
              cancelText="No"
              onConfirm={() => handleDelete(record.uploadTimeStr)}
            >
              <Button type="default" danger>
                Delete
              </Button>
            </Popconfirm>
          </>
        );
      },
    },
  ];

  return (
    <div className="home-page-body">
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="home-page-body-input"
        placeholder="Please enter name to search..."
        suffix={<SearchOutlined />}
        style={{ marginBottom: "20px" }}
      />
      <Tables
        rowKey="created_date"
        columns={columns}
        tableData={handleSearch()}
      />
    </div>
  );
};

export default Main;
