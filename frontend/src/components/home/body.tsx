import { SearchOutlined } from "@ant-design/icons";
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Popconfirm, Select } from "antd";
import Input from "antd/es/input/Input";
import { ColumnsType } from "antd/es/table";
import { Tables } from "components/table/Tables";
import { Data } from "interface/data";
import { deleteFileProxy, downloadFileProxy, getDataProxy } from "proxy/data";
import React, { useEffect, useState } from "react";
import { useInView } from 'react-intersection-observer'


const Main: React.FC = () => {
  const [search, setSearch] = useState("");
  const { ref, inView } = useInView()
  const [downloadable, setDownloadable] = useState(true)
  const queryClient = useQueryClient()
  const getDataTable = async ({pageParam = 1}) => {
    const res = await getDataProxy({
      downloadable: downloadable,
      page: pageParam,
      count: 20,
    });
    return res;
  };

  const handleDelete = async (fileId: string) => {
    await deleteFileProxy(fileId);
   };

const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
  }  = useInfiniteQuery({
    queryKey: ["data", downloadable],
    queryFn: getDataTable,
  
      getPreviousPageParam: (firstPage) => firstPage.previousId ?? undefined,
      getNextPageParam: (lastPage) => lastPage.nextId ?? undefined,
  });

  const mutation = useMutation({
    mutationFn: handleDelete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["data"] });
    },
  });

  const handleDownload = async (fileId: string) => {
    let res = await downloadFileProxy(fileId);
  };

 

  const handleSearch = () => {
    if(data !== undefined && Array.isArray(data)) {
      return data.filter((v: Data) => {
        return (
          v.name.toLowerCase().includes(search) || v.phone.includes(search)
        );
      });
    }
  };

  useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [inView])


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

      render: (text: string, record: Data) => <span>{record.createTime}</span>,
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
              onConfirm={() => mutation.mutate(record.uploadTimeStr)}
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

  const options = [{label: "Downloadable", value: true}, {label: "All", value: false}]

  return (
    <div className="home-page-body">
      <div className="home-page-util">
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="home-page-body-input"
        placeholder="Please enter name to search..."
        suffix={<SearchOutlined />}
        style={{width: "70%" }}
      />
      <Select value={downloadable} onChange={(v) => setDownloadable(v)} options={options} style={{width: "25%", marginLeft: "30px", maxWidth: "200px", height: "40px"}} />
      </div>
      <Tables
        rowKey="created_date"
        columns={columns}
        tableData={handleSearch()}
      />
      <div
              ref={ref}
            >
              {isFetchingNextPage
                ? 'Loading more...'
               : null}
            </div>
    </div>
  );
};

export default Main;
