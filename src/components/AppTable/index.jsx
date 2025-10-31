import { formatNumber } from "@/utils/helper";
import { Table } from "antd";
import React, { useMemo } from "react";

function AppTable({
  columns = [],
  dataSource = [],
  pagination = {},
  loading = false,
}) {
  const formatColumns = useMemo(() => {
    if (!columns || columns.length === 0) return [];
    return columns.map((col) => {
      if (col.render) {
        return col;
      }
      return {
        ...col,
        render: (text) => {
          if (typeof text === "number") {
            return formatNumber(text);
          }
        },
      };
    });
  })

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      pagination={{
        showSizeChanger: true,
        showQuickJumper: true,
        ...pagination,
      }}
      bordered
      loading={loading}
    />
  );
}

export default AppTable;
