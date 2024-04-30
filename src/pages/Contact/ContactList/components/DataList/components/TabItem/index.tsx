import {
  ContactDataControllerType,
  ContactDataType,
  useGetContacts,
} from "@/service";
import { Table } from "antd";
import { FC, useContext, useEffect, useMemo } from "react";
import { TabItemHeaderProp, TabItemHeader } from "./components";
import { AppContext } from "@/App";
// import { useLanguageContext } from "@/hooks";

export interface TabItemProp extends TabItemHeaderProp {
  controller: ContactDataControllerType;
}

export const TabItem: FC<TabItemProp> = ({ contactListId, controller }) => {
  const { messageApi } = useContext(AppContext);
  // const {LanguageText} = useLanguageContext<"Contact">()

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
  const contactData = useMemo<ContactDataType[]>(() => {
    if (contactCode === 200 && contactDataData?.data)
      return contactDataData.data;
    return [];
  }, [contactDataData?.data, contactCode]);

  return (
    <div style={{ padding: 5 }}>
      <TabItemHeader {...{ contactListId }} />
      <Table
        loading={contactLoading}
        rowKey={(record) => record.id}
        dataSource={contactData}
      />
    </div>
  );
};
