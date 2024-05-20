import { useLanguageContext } from "@/hooks";
import { EmailDataType } from "@/service";
import { BasicPagination } from "@/types";
import { basicTimeFormate } from "@/utils";
import { Button, Table, TableProps, Typography } from "antd";
import { Dispatch, FC, SetStateAction } from "react";
import { useNavigate } from "react-router";
import { ScheduleButton } from "./components";
import { SorterResult } from "antd/es/table/interface";
import { FilterType } from "../Filter/types";

export interface DataListProp {}

export interface DataListProp {
  emailsData: EmailDataType[];
  pagination: BasicPagination;
  setPagination: Dispatch<SetStateAction<BasicPagination>>;
  loading: boolean;
  setTimestamp: Dispatch<SetStateAction<number>>;
  setFilter: Dispatch<SetStateAction<FilterType>>;
  initSorter?: Record<string, "asc" | "desc">;
  storageFunc: () => void;
}

export const DataList: FC<DataListProp> = ({
  emailsData = [],
  pagination,
  setPagination,
  setFilter,
  loading,
  setTimestamp,
}) => {
  const navigate = useNavigate();
  const { LanguageText } = useLanguageContext<"Email">();
  const columns: TableProps["columns"] = [
    { title: LanguageText.idLabel, dataIndex: "id", align: "center" },
    { title: LanguageText.nameLabel, dataIndex: "name", align: "center" },
    {
      title: LanguageText.creatorLabel,
      dataIndex: "creator",
      align: "center",
      render: (_, { creator: { id, name } }) => (
        <Typography.Link onClick={() => navigate("/user/" + id)}>
          {name}
        </Typography.Link>
      ),
    },
    {
      title: LanguageText.networkLabel,
      dataIndex: "network",
      align: "center",
      render: (_, { network: { id, name } }) => (
        <Typography.Link onClick={() => navigate("/network/" + id)}>
          {name}
        </Typography.Link>
      ),
    },
    {
      title: LanguageText.createAtLabel,
      dataIndex: "createAt",
      key: "createAt",
      align: "center",
      render: (_, { createAt }) => <>{basicTimeFormate(createAt)}</>,
    },
    {
      title: LanguageText.updateAtLabel,
      dataIndex: "updateAt",
      key: "updateAt",
      align: "center",
      render: (_, { updateAt }) => <>{basicTimeFormate(updateAt)}</>,
    },
    {
      title: LanguageText.actionLabel,
      key: "action",
      align: "center",
      render: (_, { id, onSchedule }) => (
        <>
          <Button type="link" onClick={() => navigate("/email/" + id)}>
            {LanguageText.toDetailLabel}
          </Button>
          <ScheduleButton onSchedule={onSchedule} id={id} setTimestamp={setTimestamp} />
        </>
      ),
    },
  ];
  const paginationProps: TableProps["pagination"] = {
    ...pagination,
    position: ["topLeft"],
    onChange: (page, pageSize) =>
      setPagination((prev) => ({ ...prev, current: page, pageSize })),
  };

  return (
    <Table
      loading={loading}
      columns={columns}
      dataSource={emailsData}
      pagination={paginationProps}
      rowKey={(record) => record.id}
      onChange={(_a, _b, sorter) => {
        const { order, columnKey } = sorter as SorterResult<EmailDataType>;
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
