import { ContactDataType, useGetContacts } from "@/service";
import { Table, TableProps, Typography } from "antd";
import { FC, Key, useContext, useEffect, useMemo, useState } from "react";
import {
  TabItemHeaderProp,
  TabItemHeader,
  RemoveModal,
  DetailDrawer,
} from "./components";
import { AppContext } from "@/App";
import { useLanguageContext } from "@/hooks";
import { BasicPagination, defaultPagination } from "@/types";
import { useContactGlobalContext } from "@/pages/Contact/ContactList/hooks";
import { SorterResult } from "antd/es/table/interface";
import { useNavigate } from "react-router";
import { basicTimeFormate } from "@/utils";

type TableDataType = ContactDataType;

export interface TabItemProp extends TabItemHeaderProp {}

export const TabItem: FC<TabItemProp> = ({ contactListId }) => {
  const navigate = useNavigate();
  const { messageApi } = useContext(AppContext);
  const { LanguageText } = useLanguageContext<"Contact">();
  const { filters, searchKey, refreshContactFlag, setRefreshContactFlag } =
    useContactGlobalContext();

  const [pagination, setPagination] =
    useState<BasicPagination>(defaultPagination);
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  const [sorter, setSorter] = useState<Record<string, "asc" | "desc">>({});

  // get contact(s)
  const {
    fetchData: fetchContact,
    data: contactDataData,
    error: contactError,
    loading: contactLoading,
    code: contactCode,
  } = useGetContacts(contactListId, {
    filter: JSON.stringify({ filters, sorter, searchKey }),
    pagination,
  });
  useEffect(() => {
    if (contactError) messageApi?.error(contactError);
  }, [contactError, messageApi]);
  const contactData = useMemo<TableDataType[]>(() => {
    if (contactCode === 200 && contactDataData?.data) {
      setPagination((prev) => ({
        ...prev,
        ...contactDataData.meta.pagination,
      }));
      return contactDataData.data;
    }
    return [];
  }, [contactCode, contactDataData?.data, contactDataData?.meta.pagination]);
  useEffect(() => {
    fetchContact?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshContactFlag]);

  const tableColumns: TableProps<TableDataType>["columns"] = [
    { title: LanguageText.idLabel, dataIndex: "id", align: "center" },
    { title: LanguageText.nameLabel, dataIndex: "name", align: "center" },
    { title: LanguageText.emailLabel, dataIndex: "email", align: "center" },
    {
      title: LanguageText.phoneLabel,
      dataIndex: "phone",
      align: "center",
      render: (_, { phone }) => <>{phone || "-"}</>,
    },
    {
      title: LanguageText.creatorLabel,
      dataIndex: "creator",
      align: "center",
      render: (_, { creator: { name, id } }) => (
        <Typography.Link onClick={() => navigate("/user/" + id)}>
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
      sorter: true,
    },
    {
      title: LanguageText.updateAtLabel,
      dataIndex: "updateAt",
      key: "updateAt",
      align: "center",
      render: (_, { updateAt }) => <>{basicTimeFormate(updateAt)}</>,
      sorter: true,
    },
    {
      title: LanguageText.actionLabel,
      key: "action",
      align: "center",
      render: (_, record) => (
        <div>
          <RemoveModal
            selectedRowKeys={selectedRowKeys}
            handleSelect={() =>
              setSelectedRowKeys((prev) => [
                ...prev.filter((item) => item !== record.id),
                record.id,
              ])
            }
          />
          <DetailDrawer {...{ fetchContact, ...record }} />
        </div>
      ),
    },
  ];

  return (
    <div style={{ padding: 5 }}>
      <TabItemHeader {...{ contactListId }} />
      <Table
        loading={contactLoading}
        rowKey={(record) => record.id}
        dataSource={contactData}
        columns={tableColumns}
        pagination={pagination}
        rowSelection={{
          selectedRowKeys,
          onChange: (newValue) => setSelectedRowKeys(newValue),
        }}
        onChange={(_a, _b, sorter) => {
          const { order, columnKey } = sorter as SorterResult<ContactDataType>;
          if (!columnKey) return;
          setSorter(
            order
              ? {
                  [columnKey as string]: order === "ascend" ? "asc" : "desc",
                }
              : {}
          );
          setRefreshContactFlag(new Date().getTime());
        }}
      />
    </div>
  );
};
