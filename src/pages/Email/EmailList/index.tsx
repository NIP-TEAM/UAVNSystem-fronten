import { FC, useContext, useEffect, useMemo, useState } from "react";
import { DataList, Filter, Header } from "./components";
import { BasicCard } from "@/components";
import { EmailDataType, useGetEmails } from "@/service";
import { BasicPagination, defaultPagination } from "@/types";
import {
  SessionKeys,
  getSessionStorageUtil,
  sessionStorageUtil,
} from "@/utils";
import { AppContext } from "@/App";
import { FilterType } from "../Contact/ContactList/components/Filter/types";

export interface EmailListProp {}

interface StorageProtocol {
  filter: FilterType;
  pagination: BasicPagination;
}

const sessionKey = SessionKeys.EMAILLIST;

export const EmailList: FC<EmailListProp> = () => {
  const [pagination, setPagination] = useState<BasicPagination>(
    getSessionStorageUtil<StorageProtocol>(sessionKey)?.pagination ||
      defaultPagination
  );
  const [filter, setFilter] = useState<FilterType>(
    getSessionStorageUtil<StorageProtocol>(sessionKey)?.filter || {}
  );

  const [timestamp, setTimestamp] = useState(0);

  // networkData
  const { fetchData, data, loading, error, code } = useGetEmails({
    pagination,
    filter: JSON.stringify(filter || {}),
  });
  const emailsData = useMemo<EmailDataType[]>(() => {
    if (code === 200 && data?.data) {
      setPagination((prev) => ({ ...prev, ...data.meta.pagination }));
      return data.data;
    }
    return [];
  }, [code, data]);
  useEffect(() => {
    fetchData?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.current, pagination.pageSize, timestamp]);
  const { messageApi } = useContext(AppContext);
  useEffect(() => {
    if (!error) return;
    messageApi?.error(error);
  }, [error, messageApi]);

  useEffect(() => {
    sessionStorage.removeItem("email-filter");
  }, []);

  const storageFunc = () =>
    sessionStorageUtil(sessionKey, { filter, pagination });

  return (
    <BasicCard>
      <Header />
      <Filter {...{ setFilter, setTimestamp, initParams: filter }} />
      <DataList
        {...{
          pagination,
          setPagination,
          emailsData,
          loading,
          setTimestamp,
          setFilter,
          initSorter: filter?.sorter,
          storageFunc,
        }}
      />
    </BasicCard>
  );
};
