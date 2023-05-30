import Table, { ColumnsType } from "antd/es/table";
import React, { useRef } from "react";

interface Props {
  columns: ColumnsType<any>;
  tableData: any;
  rowKey: string;
}
export const Tables: React.FC<Props> = ({ columns, tableData, rowKey }) => {
  return (
    <>
      <Table
        rowKey={rowKey}
        columns={columns}
        dataSource={tableData}
        scroll={{ y: 800 }}
        bordered
        pagination={false}
      />
    </>
  );
};
