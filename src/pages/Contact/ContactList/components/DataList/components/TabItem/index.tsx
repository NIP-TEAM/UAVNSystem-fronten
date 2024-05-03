import {
  ContactDataControllerType,
  ContactDataType,
  useGetContacts,
} from "@/service";
import { Button, Flex, Table, TableProps, Typography } from "antd";
import { FC, useContext, useEffect, useMemo } from "react";
import { TabItemHeaderProp, TabItemHeader } from "./components";
import { AppContext } from "@/App";
import { useLanguageContext } from "@/hooks";
import { RemoveModal } from "./components/RemoveModal";
// import { useLanguageContext } from "@/hooks";

type TableDataType = ContactDataType;

export interface TabItemProp extends TabItemHeaderProp {
  controller: ContactDataControllerType;
}

export const TabItem: FC<TabItemProp> = ({ contactListId, controller }) => {
  const { messageApi } = useContext(AppContext);
  const { LanguageText } = useLanguageContext<"Contact">();

  const tableColumns: TableProps<TableDataType>["columns"] = [
    { title: LanguageText.idTitle, dataIndex: "id", align: "center" },
    { title: LanguageText.nameTitle, dataIndex: "name", align: "center" },
    {
      title: LanguageText.actionTitle,
      key: "action",
      align: "center",
      render: (_, record) => (
        <div>
          <RemoveModal id={record.id} />
          <Typography.Link>{LanguageText.toDetailTitle}</Typography.Link>
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
    if (contactCode === 200 && contactDataData?.data)
      return contactDataData.data;
    return [
      {
        name: "test",
        id: 1,
        phone: "13808070211",
        email: "2530056984@qq.com",
        note: "1111",
        createdAt: new Date().getTime().toString(),
        updatedAt: new Date().getTime().toString(),
        creator: {
          name: "user1",
          id: 1,
        },
        contactListIds: [],
      },
    ];
  }, [contactDataData?.data, contactCode]);

  return (
    <div style={{ padding: 5 }}>
      <TabItemHeader {...{ contactListId }} />
      <Table
        loading={contactLoading}
        rowKey={(record) => record.id}
        dataSource={contactData}
        columns={tableColumns}
      />
    </div>
  );
};
