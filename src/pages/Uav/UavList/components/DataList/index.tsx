import {
  Dispatch,
  FC,
  Key,
  ReactNode,
  SetStateAction,
  useMemo,
  useState,
} from "react";
import { Button, Flex, Table, TableProps, Typography } from "antd";
import { UavDataType } from "@/service/Uav";
import { FilterType } from "@/pages/Network/NetworkList/types";
import { BasicPagination } from "@/types";
import { useLanguageContext } from "@/hooks";
import { useNavigate } from "react-router";
import {
  CheckCircleFilled,
  CloseCircleFilled,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import { SorterResult } from "antd/es/table/interface";
import { DeleteModal } from "./components";
import { basicTimeFormate } from "@/utils";

export interface DataListProp {
  uavLoading: boolean;
  uavListData: UavDataType[];
  storageFunc: () => void;
  setTimestamp: Dispatch<SetStateAction<number>>;
  setFilter: Dispatch<SetStateAction<FilterType>>;
  initSorter?: Record<string, "asc" | "desc">;
  pagination: BasicPagination;
  setPagination: Dispatch<SetStateAction<BasicPagination>>;
}

export const DataList: FC<DataListProp> = ({
  uavLoading,
  uavListData,
  storageFunc,
  pagination,
  setPagination,
  setFilter,
  setTimestamp,
}) => {
  const { LanguageText } = useLanguageContext<"Uav">();
  const navigate = useNavigate();
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
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
  const columns: TableProps["columns"] = [
    {
      title: LanguageText.idLabel,
      key: "id",
      dataIndex: "id",
      align: "center",
      ellipsis: true,
    },
    {
      title: LanguageText.nameTableLabel,
      key: "name",
      dataIndex: "name",
      align: "center",
      ellipsis: true,
    },
    {
      title: LanguageText.macLabel,
      key: "mac",
      dataIndex: "mac",
      align: "center",
      ellipsis: true,
    },
    {
      title: LanguageText.networkLabel,
      key: "network",
      dataIndex: ["networkInfo", "name"],
      align: "center",
      ellipsis: true,
      render: (_, { networkInfo }) => (
        <Button
          type="link"
          onClick={() => {
            storageFunc();
            navigate("/network/" + networkInfo.id);
          }}
        >
          {networkInfo.name}
        </Button>
      ),
    },
    {
      title: LanguageText.statusLabel,
      key: "status",
      dataIndex: "status",
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
      title: LanguageText.creatorLabel,
      key: "creator",
      align: "center",
      ellipsis: true,
      render: (_, { creatorInfo: { name, id } }) => (
        <Button
          type="link"
          onClick={() => {
            storageFunc();
            navigate(`/user/${id}`);
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
      render: (_, { createAt }) => <>{basicTimeFormate(createAt)}</>,
    },
    {
      title: LanguageText.action,
      key: "action",
      align: "center",
      ellipsis: true,
      render: (_, { id }) => (
        <DeleteModal
          selectedIds={[...new Set([...selectedRowKeys, id])] as string[]}
          setTimestamp={setTimestamp}
        />
      ),
    },
  ];
  const paginationProps: TableProps["pagination"] = {
    ...pagination,
    position: ["topLeft"],
    onChange: (page, pageSize) =>
      setPagination((prev) => ({ ...prev, current: page, pageSize })),
  };
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

  return (
    <Table
      style={{ width: "100%", overflowY: "auto" }}
      loading={uavLoading}
      dataSource={uavListData}
      pagination={paginationProps}
      footer={() => Footer}
      rowSelection={{
        selectedRowKeys,
        onChange: (newValue) => setSelectedRowKeys(newValue),
      }}
      rowKey={(record) => record.id}
      columns={columns}
      onChange={(_a, _b, sort) => {
        const { order, columnKey } = sort as SorterResult<UavDataType>;
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
