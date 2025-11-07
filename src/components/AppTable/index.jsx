import { formatNumber } from "@/utils/helper";
import { Table } from "antd";
import React, { useMemo } from "react";

function AppTable({
  columns = [],
  dataSource = [],
  pagination = {},
  loading = false,
  ...props
}) {
  const formatColumns = useMemo(() => {
    if (!columns || columns.length === 0) return [];
    return columns.map((col) => {
      if (col.render) {
        return {
          ...col,
          align: "center",
        };
      }
      return {
        ...col,
        align: "center",
        render: (text) => {
          if (typeof text === "number") {
            return formatNumber(text);
          }
          return text;
        },
      };
    });
  }, [columns]);

  return (
    <Table
      columns={formatColumns}
      dataSource={dataSource}
      pagination={
        pagination === null
          ? false
          : {
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) =>
                total === 1
                  ? `Showing ${total} item`
                  : `Showing ${range[0]}-${range[1]} of ${total} items`,
              ...pagination,
            }
      }
      bordered
      loading={loading}
      scroll={{
        x: "max-content",
      }}
      {...props}
    />
  );
}

export default AppTable;
