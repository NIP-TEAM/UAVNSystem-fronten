import { BasicCard } from "@/components";
import { SessionKeys, getSessionStorageUtil } from "@/utils";
import { Spin } from "antd";
import { FC, useContext, useEffect, useMemo, useState } from "react";
import { DataList, Filter, Header } from "./components";
import {
  ContactDataControllerType,
  ContactListDataType,
  useGetContactLists,
} from "@/service";
import { AppContext } from "@/App";
import { BasicPagination } from "@/types";
import { ContactListDataControllerProvider } from "./hooks";

interface ContactProp {}

const sessionKey = SessionKeys.CONTACTLIST;

const defaultPagination: Readonly<BasicPagination> = {
  current: 1,
  pageSize: 10,
  total: 10,
};

export const Contact: FC<ContactProp> = () => {
  const { messageApi } = useContext(AppContext);
  const [timestamp, setTimestamp] = useState(0);
  const [pagination, setPagination] = useState<BasicPagination>(
    getSessionStorageUtil<ContactDataControllerType>(sessionKey)?.pagination ||
      defaultPagination
  );
  const [filter, setFilter] = useState(
    getSessionStorageUtil<ContactDataControllerType>(sessionKey)?.filter || ""
  );
  useEffect(() => {
    sessionStorage.removeItem(sessionKey);
  }, []);

  // contactListData
  const {
    fetchData: fetchContactList,
    code: contactListCode,
    error: contactListError,
    data: contactListDataData,
    loading: contactListLoading,
  } = useGetContactLists();
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
    <ContactListDataControllerProvider
      {...{
        pagination,
        contactListRefresh: () => setTimestamp(new Date().getTime()),
      }}
    >
      <BasicCard>
        <Header />
        <Filter {...{ setFilter, setTimestamp }} />
        <Spin spinning={contactListLoading}>
          <DataList
            {...{
              contactListData,
              setPagination,
              controller: {
                pagination,
                filter,
              },
            }}
          />
        </Spin>
      </BasicCard>
    </ContactListDataControllerProvider>
  );
};
