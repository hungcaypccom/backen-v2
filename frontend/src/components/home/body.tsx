import {
  DeleteOutlined,
  DownloadOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Form,
  Popconfirm,
  Select,
  Space,
  Tooltip,
  message,
} from "antd";
import Input from "antd/es/input/Input";
import { ColumnsType } from "antd/es/table";
import { ResponseInterceptor } from "components/exceptions/respinse.interceptor";
import { Tables } from "components/table/Tables";
import { Data } from "interface/data";
import React, { useState } from "react";
import {
  deleteFileProxy,
  downloadFileProxy,
  getDataProxy,
  getTotalPageProxy,
} from "services/proxy/data";
import useIsMobile from "../../hooks/useIsMobile";
import { useNavigate } from "react-router-dom";

const Main: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [downloadable, setDownloadable] = useState(false);
  const [downloadCursor, setDownloadCursor] = useState(1);
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>();
  const isMobile = useIsMobile();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/login", { replace: true });
  };
  const getDataTable = async (
    downloadable: boolean,
    downloadCursor: number,
    search: string
  ) => {
    const res = await getDataProxy({
      downloadable: downloadable,
      page: downloadCursor,
      count: 20,
      filter: search,
    });
    return res;
  };

  const handleDelete = async (fileId: string | [any]) => {
    await deleteFileProxy(fileId);
  };

  const totalPageQuery = useQuery({
    queryKey: ["totalPage", downloadable, search],
    queryFn: () =>
      getTotalPageProxy({ downloadable: downloadable, filter: search }),
  });

  const pageQuery = useQuery({
    queryKey: ["data", downloadable, downloadCursor, search],
    queryFn: () => getDataTable(downloadable, downloadCursor, search),
  });

  const mutation = useMutation({
    mutationFn: handleDelete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["data"] });
    },
  });

  const handleClickPagination = (page: number) => {
    setDownloadCursor(page);
  };

  const handleDownload = async (fileId: string) => {
    await downloadFileProxy(
      { uploadTimeStr: fileId },
      handleLogout,
      (status: boolean) => {
        setLoading(status);
      }
    );
  };

  const onSelectChange = (newSelectedRowKeys: any[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = Array.isArray(selectedRowKeys)
    ? selectedRowKeys?.length > 0
    : false;

  const columns: ColumnsType<any> = [
    {
      title: "Name",
      dataIndex: "name",
      align: "center",
      render: (text: string, record: Data) => <span>{record?.name}</span>,
    },
    {
      title: "Birthday",
      dataIndex: "birthday",
      align: "center",

      render: (text: string, record: Data) => <span>{record?.birthday}</span>,
    },
    {
      title: "Phone",
      dataIndex: "phone_number",
      align: "center",
      render: (text: string, record: Data) => <span>{record?.phone}</span>,
    },
    {
      title: "Created at",
      dataIndex: "created_date",
      align: "center",
      render: (text: string, record: Data) => {
        const timestamp = parseInt(record?.createTime);
        const dateConvert = new Date(timestamp);
        return (
          <span>
            {dateConvert.toLocaleTimeString() +
              " " +
              dateConvert.toLocaleDateString()}
          </span>
        );
      },
    },
    {
      title: "Action",
      dataIndex: "delete",
      align: "center",
      render: (text: string, record: Data) => {
        return (
          <Space>
            <Tooltip title={"Download"}>
              <Button
                disabled={!(record?.status && record?.downloadable) || loading}
                type="default"
                style={{ marginRight: "10px" }}
                onClick={() => {
                  handleDownload(record?.uploadTimeStr);
                }}
                icon={<DownloadOutlined />}
              />
            </Tooltip>
            <Popconfirm
              placement="top"
              title="Do you want to delete this record"
              okText="Yes"
              cancelText="No"
              onConfirm={() => mutation.mutate(record?.uploadTimeStr)}
            >
              <Tooltip title={"Delete"}>
                <Button
                  disabled={!(record?.status && record?.downloadable)}
                  type="default"
                  danger
                  icon={<DeleteOutlined />}
                />
              </Tooltip>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  const options = [
    { label: "Downloadable", value: true },
    { label: "All", value: false },
  ];

  return (
    <div className="home-page-body">
      <div className="home-page-util">
        <Form
          onFinish={(value) => {
            console.log("searching...", value);

            if (value.filter) {
              setSearch(value.filter);
            } else {
              setSearch("");
            }
          }}
          layout="inline"
          style={{ width: "100%", flexGrow: "1" }}
        >
          <Form.Item name="filter" style={{ flexGrow: "1" }}>
            <Input
              allowClear
              onChange={(e) => {
                if (e.target.value == "") {
                  setSearch("");
                }
              }}
              className="home-page-body-input"
              placeholder="Please enter name to search..."
              suffix={<SearchOutlined />}
            />
          </Form.Item>
          <Button
            htmlType="submit"
            type="primary"
            style={{ height: "40px", width: "100px" }}
          >
            Search
          </Button>
        </Form>

        <Select
          value={downloadable}
          onChange={(v) => {
            setSelectedRowKeys([]);
            setDownloadCursor(1);
            setDownloadable(v);
          }}
          options={options}
          style={{
            width: isMobile ? "100%" : "25%",
            marginLeft: isMobile ? "0px" : "30px",
            maxWidth: isMobile ? "100%" : "200px",
            height: "40px",
          }}
        />
      </div>
      <div className="home-page-util">
        <Button
          danger
          type="primary"
          onClick={() => {
            const uploadTimeStrArray: any = selectedRowKeys?.map((key) => {
              const selectedRow = pageQuery.data?.find(
                (row: any) => row.uploadTimeStr === key
              );
              return selectedRow ? selectedRow.uploadTimeStr : null;
            });
            if (uploadTimeStrArray) mutation.mutate(uploadTimeStrArray);
          }}
          disabled={!hasSelected}
        >
          Delete
        </Button>
        <span style={{ marginLeft: 8 }}>
          {hasSelected && selectedRowKeys
            ? `Selected ${selectedRowKeys.length} items`
            : ""}
        </span>
      </div>
      <Tables
        rowKey="uploadTimeStr"
        columns={columns}
        tableData={!!pageQuery.data ? pageQuery.data : []}
        props={{ scroll: { x: "100%" }, rowSelection: { ...rowSelection } }}
        pagination={{
          total: totalPageQuery.isSuccess ? totalPageQuery.data ?? 0 : 0,
          current: downloadCursor,
          pageSize: 20,
          onChange: handleClickPagination,
          showSizeChanger: false,
        }}
      />
      <ResponseInterceptor />
    </div>
  );
};

export default Main;
