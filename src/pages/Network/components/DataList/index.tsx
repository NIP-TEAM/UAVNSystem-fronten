import { useLanguageContext } from "@/hooks";
import { NetworkDataType } from "@/service/Network";
import { BasicPagination } from "@/types";
import { DownOutlined } from "@ant-design/icons";
import { Button, Dropdown, Flex, Space, Table, Typography } from "antd";
import { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { Dispatch, FC, Key, SetStateAction, useMemo, useState } from "react";

export interface DataListProp {
  networkData: NetworkDataType[];
  pagination: BasicPagination;
  setPagination: Dispatch<SetStateAction<BasicPagination>>;
  loading: boolean;
}

export const DataList: FC<DataListProp> = ({
  networkData = [],
  pagination,
  setPagination,
  loading,
}) => {
  const { LanguageText } = useLanguageContext<"Network">();
  const columns: ColumnsType<NetworkDataType> = [
    {
      title: LanguageText["id"],
      dataIndex: "id",
      key: "id",
    },
    {
      title: LanguageText["name"],
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Space size="small">
          <Button type="link">Details</Button>
          <Dropdown
            menu={{
              items: [
                { key: "1", label: "Action 1" },
                { key: "2", label: "Action 2" },
              ],
            }}
          >
            <Button type="link">
              More <DownOutlined />
            </Button>
          </Dropdown>
        </Space>
      ),
    },
  ];

  const paginationProps: TablePaginationConfig = {
    ...pagination,
    position: ["topLeft"],
    onChange: (page, pageSize) =>
      setPagination((prev) => ({ ...prev, current: page, pageSize })),
  };

  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);

  const Footer = useMemo(
    () => (
      <Flex gap="1em">
        <Typography.Text>{`${LanguageText.total}: ${pagination.total}`}</Typography.Text>
        {!!selectedRowKeys.length && (
          <Typography.Text>{`${LanguageText.select}: ${selectedRowKeys.length}`}</Typography.Text>
        )}
      </Flex>
    ),
    [LanguageText.select, LanguageText.total, pagination.total, selectedRowKeys.length]
  );

  return (
    <Table
      loading={loading}
      dataSource={networkData}
      columns={columns}
      pagination={paginationProps}
      footer={() => Footer}
      rowSelection={{
        selectedRowKeys,
        onChange: (newValue) => setSelectedRowKeys(newValue),
      }}
      rowKey={(record) => record.id}
    />
  );
};
