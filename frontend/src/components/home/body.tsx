import {
  DeleteOutlined,
  DownloadOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { Button, Popconfirm, Select, Space, Tooltip, message } from "antd";
import Input from "antd/es/input/Input";
import { ColumnsType } from "antd/es/table";
import { Tables } from "components/table/Tables";
import { Data } from "interface/data";
import React, { useState } from "react";
import {
  deleteFileProxy,
  downloadFileProxy,
  getDataProxy,
  getTotalPageProxy,
} from "services/proxy/data";

const Main: React.FC = () => {
  const [search, setSearch] = useState("");
  const [downloadable, setDownloadable] = useState(false);
  const [downloadCursor, setDownloadCursor] = useState(1);
  const [selectedRowKeys, setSelectedRowKeys] = useState<[any]>();

  const queryClient = useQueryClient();

  const getDataTable = async () => {
    const res = await getDataProxy({
      downloadable: downloadable,
      page: downloadCursor,
      count: 20,
    });

    return res;
  };

  const handleDelete = async (fileId: string | [any]) => {
    let res = await deleteFileProxy(fileId);
    if (res) message.success(res);
  };

  const totalPageQuery = useQuery({
    queryKey: ["totalPage", downloadable],
    queryFn: () => getTotalPageProxy({ downloadable: downloadable }),
  });

  const pageQuery = useQuery({
    queryKey: ["data", downloadable, downloadCursor],
    queryFn: getDataTable,
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
    await downloadFileProxy({ uploadTimeStr: fileId });
  };

  const handleSearch = () => {
    if (search !== "") {
      if (pageQuery.data !== undefined && Array.isArray(pageQuery.data)) {
        let dataConcat: any = [];
        pageQuery.data.forEach((value, index) => {
          dataConcat = dataConcat.concat(value);
        });
        return dataConcat.filter((v: Data) => {
          return (
            v.name.toLowerCase().includes(search) || v.phone.includes(search)
          );
        });
      }
    } else {
      if (pageQuery.data !== undefined && Array.isArray(pageQuery.data)) {
        let dataConcat: any = [];
        pageQuery.data.forEach((value, index) => {
          dataConcat = dataConcat.concat(value);
        });
        return dataConcat;
      }
    }
    return [];
  };

  const onSelectChange = (newSelectedRowKeys: [any]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = Array.isArray(selectedRowKeys) ? selectedRowKeys?.length > 0 : false;

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
        return <span>{dateConvert.toLocaleTimeString() + " " + dateConvert.toLocaleDateString()}</span>;
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
                disabled={!(record?.status && record?.downloadable)}
                type="default"
                style={{ marginRight: "10px" }}
                onClick={() => handleDownload(record?.uploadTimeStr)}
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

  console.log("selectedRowKeys", selectedRowKeys);
  

  const options = [
    { label: "Downloadable", value: true },
    { label: "All", value: false },
  ];

  return (
    <div className="home-page-body">
      <div className="home-page-util">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="home-page-body-input"
          placeholder="Please enter name to search..."
          suffix={<SearchOutlined />}
          style={{ width: "70%" }}
        />
        <Select
          value={downloadable}
          onChange={(v) => setDownloadable(v)}
          options={options}
          style={{
            width: "25%",
            marginLeft: "30px",
            maxWidth: "200px",
            height: "40px",
          }}
        />
      </div>
      <div className="home-page-util">

      <Button danger type="primary" onClick={() => {
         const uploadTimeStrArray:any = selectedRowKeys?.map(key => {
          const selectedRow = handleSearch().find((row:any) => row.uploadTimeStr === key);
          return selectedRow ? selectedRow.uploadTimeStr : null;
        });
        if(uploadTimeStrArray)
        mutation.mutate(uploadTimeStrArray)
        }}
        disabled={!hasSelected}
        >
          Delete
        </Button>
      <span style={{ marginLeft: 8 }}>
          {hasSelected && selectedRowKeys ? `Selected ${selectedRowKeys.length} items` : ''}
        </span>
        </div>
      <Tables
        rowKey="uploadTimeStr"
        columns={columns}
        tableData={handleSearch()}
        props={{ scroll: { x: "100%" },  rowSelection: { ...rowSelection } }}
        pagination={{
          total: totalPageQuery.isSuccess ? totalPageQuery.data ?? 0 : 0,
          current: downloadCursor,
          pageSize: 20,
          onChange: handleClickPagination,
          showSizeChanger: false
        }}
      />
    </div>
  );
};

export default Main;
