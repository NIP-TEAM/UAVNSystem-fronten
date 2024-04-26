import { BasicCard } from "@/components";
import { useLanguageContext } from "@/hooks";
import { SessionKeys, getSessionStorageUtil } from "@/utils";
import { Spin, Typography } from "antd";
import { FC, useContext, useEffect, useMemo, useState } from "react";
import { DataList, Filter, FilterProp, Header } from "./components";
import { ContactListDataType, useGetContactList } from "@/service";
import { AppContext } from "@/App";

interface ContactProp {}

export const Contact: FC<ContactProp> = () => {
  const { messageApi } = useContext(AppContext);
  const { LanguageText } = useLanguageContext<"Contact">();
  const [timestamp, setTimestamp] = useState(0);
  const [filter, setFilter] = useState()

  // contactListData
  const {
    fetchData: fetchContactList,
    code: contactListCode,
    error: contactListError,
    data: contactListDataData,
    loading: contactListLoading,
  } = useGetContactList();
  useEffect(() => {
    if (contactListError) messageApi?.error(contactListError);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contactListError]);
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
      <Header />
      {/* <Filter /> */}
      <Spin spinning={contactListLoading}>
        <DataList {...{ contactListData }} />
      </Spin>
    </BasicCard>
  );
};
