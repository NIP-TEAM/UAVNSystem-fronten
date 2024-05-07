import {
  ContactDataControllerType,
  ContactDataType,
  useGetContacts,
} from "@/service";
import { Table, TableProps, Typography } from "antd";
import { FC, Key, useContext, useEffect, useMemo, useState } from "react";
import { TabItemHeaderProp, TabItemHeader, RemoveModal, AsideDrawer } from "./components";
import { AppContext } from "@/App";
import { useLanguageContext } from "@/hooks";
import { BasicPagination, defaultPagination } from "@/types";
// import { useLanguageContext } from "@/hooks";

type TableDataType = ContactDataType;

export interface TabItemProp extends TabItemHeaderProp {
  controller: ContactDataControllerType;
}

export const TabItem: FC<TabItemProp> = ({ contactListId, controller }) => {
  const { messageApi } = useContext(AppContext);
  const { LanguageText } = useLanguageContext<"Contact">();

  const [pagination, setPagination] =
    useState<BasicPagination>(defaultPagination);
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);

  const tableColumns: TableProps<TableDataType>["columns"] = [
    { title: LanguageText.idTitle, dataIndex: "id", align: "center" },
    { title: LanguageText.nameTitle, dataIndex: "name", align: "center" },
    {
      title: LanguageText.actionTitle,
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
          <AsideDrawer id={record.id} />
        </div>
      ),
    },
  ];

  // get contact(s)
  const {
    fetchData: fetchContact,
    data: contactDataData,
    error: contactError,
    loading: contactLoading,
    code: contactCode,
  } = useGetContacts(contactListId, controller);
  useEffect(() => {
    if (contactError) messageApi?.error(contactError);
  }, [contactError, messageApi]);
  useEffect(() => {
    fetchContact?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
      />
    </div>
  );
};
