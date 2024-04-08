import { useLanguageContext } from "@/hooks";
import { NetworkDataType } from "@/service/Network";
import { BasicPagination } from "@/types";
import { DownOutlined } from "@ant-design/icons";
import { Button, Dropdown, Flex, Space, Table, Typography } from "antd";
import { ItemType } from "antd/es/menu/hooks/useItems";
import { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { Dispatch, FC, Key, SetStateAction, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { DeleteTip } from "./components";

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
  const navigate = useNavigate()
  const { LanguageText } = useLanguageContext<"Network">();
  const items = (currentId: string):ItemType[] => [
    { key: "1", label: <DeleteTip selectedIds={[...(new Set([...selectedRowKeys, currentId]))] as string[]}/> },
  ]
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
      title: LanguageText.action,
      key: "action",
      align: "center",
      render: (_, record) => (
        <Space size="small">
          <Button type="link" onClick={() => navigate(`/network/${record.id}`)}>{LanguageText.detail}</Button>
          <Dropdown
          trigger={["click"]}
            menu={{
              items: items(record.id),
            }}
          >
            <Button type="link">
              {LanguageText.more} <DownOutlined />
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
