import { BasicCard } from "@/components";
import { useLanguageContext } from "@/hooks";
import { SessionKeys, getSessionStorageUtil } from "@/utils";
import { Spin, Typography } from "antd";
import { FC, useContext, useEffect, useMemo, useState } from "react";
import { DataList, Filter } from "./components";
import {
  ContactListDataControllerType,
  ContactListDataType,
  useGetContactList,
} from "@/service";
import { AppContext } from "@/App";

interface EmailProp {}

// const contactListData: ContactListDataType[] = [
//   {
//     id: 1,
//     name: "test",
//     createdAt: "1",
//     updatedAt: new Date().getTime().toString(),
//     creator: {
//       name: "test",
//       id: 1,
//     },
//     updator: {
//       name: "test",
//       id: 1,
//     },
//     networkInfo: [{ name: "1", id: 1 }],
//   },
// ];

const sessionKey = SessionKeys.CONTACTLIST;

export const Contact: FC<EmailProp> = () => {
  const { messageApi } = useContext(AppContext);
  const { LanguageText } = useLanguageContext<"Contact">();
  const [dataController, setDataController] =
    useState<ContactListDataControllerType>(
      getSessionStorageUtil<ContactListDataControllerType>(sessionKey) || {}
    );
  const [timestamp, setTimestamp] = useState(0);

  // contactListData
  const {
    fetchData: fetchContactList,
    code: contactListCode,
    error: contactListError,
    data: contactListDataData,
    loading: contactListLoading,
  } = useGetContactList(dataController);
  useEffect(() => {
    if (contactListError) messageApi?.error(contactListError);
  }, [contactListError, messageApi]);
  const contactListData = useMemo<ContactListDataType[]>(() => {
    if (contactListCode === 200 && contactListDataData?.data)
      return contactListDataData.data;
    return [];
  }, [contactListCode, contactListDataData?.data]);
  useEffect(() => {
    fetchContactList?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    fetchContactList?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timestamp]);

  return (
    <BasicCard>
      <Typography.Title level={4}>{LanguageText.emailTitle}</Typography.Title>
      <Filter {...{ setTimestamp, setDataController }} />
      <Spin spinning={contactListLoading}>
        <DataList {...{ contactListData }} />
      </Spin>
    </BasicCard>
  );
};
