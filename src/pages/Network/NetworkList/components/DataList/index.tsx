import { useLanguageContext } from "@/hooks";
import { NetworkDataType } from "@/service/Network";
import { BasicPagination } from "@/types";
import {
  CheckCircleFilled,
  CloseCircleFilled,
  DownOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import { Button, Dropdown, Flex, Table, Typography } from "antd";
import { ItemType } from "antd/es/menu/hooks/useItems";
import { ColumnsType, TablePaginationConfig } from "antd/es/table";
import {
  Dispatch,
  FC,
  Key,
  ReactNode,
  SetStateAction,
  useMemo,
  useState,
} from "react";
import { useNavigate } from "react-router";
import { DeleteTip } from "./components";
import dayjs from "dayjs";
import { FilterType } from "../../types";
import { SorterResult } from "antd/es/table/interface";

export interface DataListProp {
  networkData: NetworkDataType[];
  pagination: BasicPagination;
  setPagination: Dispatch<SetStateAction<BasicPagination>>;
  loading: boolean;
  setTimestamp: Dispatch<SetStateAction<number>>;
  setFilter: Dispatch<SetStateAction<FilterType>>;
  initSorter?: Record<string, "asc" | "desc">;
  storageFunc: () => void;
}

export const DataList: FC<DataListProp> = ({
  networkData = [],
  pagination,
  setPagination,
  loading,
  setTimestamp,
  setFilter,
  initSorter,
  storageFunc,
}) => {
  const navigate = useNavigate();
  const { LanguageText } = useLanguageContext<"Network">();
  const items = (currentId: string): ItemType[] => [
    {
      key: "1",
      label: (
        <DeleteTip
          selectedIds={
            [...new Set([...selectedRowKeys, currentId])] as string[]
          }
          setTimestamp={setTimestamp}
        />
      ),
    },
  ];
  const columns = [
    ...([
      {
        title: LanguageText.id,
        dataIndex: "id",
        key: "id",
        ellipsis: true,
      },
      {
        title: LanguageText.name,
        dataIndex: "name",
        key: "name",
        align: "center",
        ellipsis: true,
      },
      {
        title: LanguageText.statusTitle,
        key: "status",
        align: "center",
        ellipsis: true,
        render: (_, { status }) => (
          <Flex align="center" justify="center" gap={5}>
            {StatusDescription[status].icon}
            {StatusDescription[status].description}
          </Flex>
        ),
      },
      {
        title: LanguageText.countTitle,
        key: "count",
        dataIndex: "uavCount",
        align: "center",
        ellipsis: true,
      },
      {
        title: LanguageText.creatorTitle,
        key: "creator",
        align: "center",
        ellipsis: true,
        render: (_, { creator: { name, id } }) => (
          <Button
            type="link"
            onClick={() => {
              storageFunc();
              navigate(`/usercenter/${id}`);
            }}
          >
            @{name}
          </Button>
        ),
      },
      {
        title: LanguageText.createAtTitle,
        key: "createAt",
        align: "center",
        ellipsis: true,
        sorter: true,
        render: (_, { createAt }) => (
          <>{dayjs(Number(createAt)).format("YYYY-MM-DD HH:mm")}</>
        ),
      },
      {
        title: LanguageText.lastEditTitle,
        key: "lastEdit",
        align: "center",
        ellipsis: true,
        sorter: true,
        render: (_, { lastEdit }) => (
          <>{dayjs(Number(lastEdit)).format("YYYY-MM-DD HH:mm")}</>
        ),
      },
      {
        title: LanguageText.action,
        key: "action",
        align: "center",
        ellipsis: true,
        render: (_, record) => (
          <Flex align="center" justify="center" gap="small">
            <Button
              type="link"
              style={{ margin: 0, padding: 0 }}
              onClick={() => {
                storageFunc();
                navigate(`/network/${record.id}`);
              }}
            >
              {LanguageText.detail}
            </Button>
            <Dropdown
              trigger={["click"]}
              menu={{
                items: items(record.id),
              }}
            >
              <Button type="link" style={{ margin: 0, padding: 0 }}>
                {LanguageText.more} <DownOutlined />
              </Button>
            </Dropdown>
          </Flex>
        ),
      },
    ] as ColumnsType<NetworkDataType>),
  ].map((item) => ({
    ...item,
    ...(initSorter?.[item.key as string]
      ? {
          defaultSortOrder:
            initSorter?.[item.key as string] === "asc" ? "ascend" : "descend",
        }
      : {}),
  }));

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
    [
      LanguageText.select,
      LanguageText.total,
      pagination.total,
      selectedRowKeys.length,
    ]
  );

  const StatusDescription: Record<
    number,
    {
      icon: ReactNode;
      description: ReactNode;
    }
  > = useMemo(
    () =>
      ({
        1: {
          icon: <ExclamationCircleFilled style={{ color: "#faad14" }} />,
          description: (
            <Typography.Text type="warning">
              {LanguageText.initStatus}
            </Typography.Text>
          ),
        },
        2: {
          icon: <CheckCircleFilled style={{ color: "#52c41a" }} />,
          description: (
            <Typography.Text type="success">
              {LanguageText.doneStatus}
            </Typography.Text>
          ),
        },
        3: {
          icon: <CloseCircleFilled style={{ color: "#ff4d4f" }} />,
          description: (
            <Typography.Text type="danger">
              {LanguageText.errorStatus}
            </Typography.Text>
          ),
        },
      } as const),
    [LanguageText]
  );

  return (
    <Table
      loading={loading}
      dataSource={networkData}
      columns={columns as ColumnsType<NetworkDataType>}
      pagination={paginationProps}
      footer={() => Footer}
      rowSelection={{
        selectedRowKeys,
        onChange: (newValue) => setSelectedRowKeys(newValue),
      }}
      rowKey={(record) => record.id}
      style={{ width: "100%", overflowY: "auto" }}
      onChange={(_a, _b, sort) => {
        const { order, columnKey } = sort as SorterResult<NetworkDataType>;
        if (!columnKey) return;
        setFilter((prev) => ({
          ...prev,
          sorter: order
            ? {
                [columnKey as string]: order === "ascend" ? "asc" : "desc",
              }
            : {},
        }));
        setTimestamp(new Date().getTime());
      }}
    />
  );
};
