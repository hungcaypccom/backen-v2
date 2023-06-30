import Table, { ColumnsType, TablePaginationConfig } from "antd/es/table";
import React, { useRef } from "react";

interface Props {
  columns: ColumnsType<any>;
  tableData: any;
  rowKey: string;
  props: any;
  pagination: TablePaginationConfig
}
export const Tables: React.FC<Props> = ({ columns, tableData, rowKey, pagination, props }) => {
  return (
    <>
      <Table
        rowKey={rowKey}
        columns={columns}
        dataSource={tableData}
        style={{width: "100%", maxWidth: "100%"}}
        bordered
        pagination={pagination}
        {...props}
      />
    </>
  );
};
  