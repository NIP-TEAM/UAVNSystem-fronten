import { BasicCard } from "@/components";
import { FC, useContext, useEffect, useMemo, useState } from "react";
import { Filter, ProtocolHeader, ProtocolList } from "./components";
import { ProtocolDataType, useGetProtocols } from "@/service";
import { BasicFilterType, BasicPagination, defaultPagination } from "@/types";
import {
  SessionKeys,
  getSessionStorageUtil,
  sessionStorageUtil,
} from "@/utils";
import { AppContext } from "@/App";

export interface NetworkTypeProp {}

const sessionKey = SessionKeys.PROTOCOL;

export const NetworkProtocol: FC<NetworkTypeProp> = () => {
  const [filter, setFilter] = useState<BasicFilterType>(
    getSessionStorageUtil<BasicFilterType>(SessionKeys.PROTOCOL) || {}
  );
  const [pagination, setPagination] =
    useState<BasicPagination>(defaultPagination);
  const [timestamp, setTimestamp] = useState(0);
  const { fetchData, data, loading, error, code } = useGetProtocols({
    pagination,
    filter: JSON.stringify(filter || {}),
  });
  const protocolData = useMemo<ProtocolDataType[]>(() => {
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
  const storageFunc = () => sessionStorageUtil(sessionKey, filter);

  useEffect(() => {
    sessionStorage.removeItem(SessionKeys.PROTOCOL);
  }, []);

  return (
    <BasicCard style={{ overflowX: "auto" }}>
      <ProtocolHeader {...{ setFilter }} />
      <Filter setFilter={setFilter} setTimestamp={setTimestamp} />
      <ProtocolList
        {...{ protocolData, pagination, setPagination, loading, storageFunc }}
      />
    </BasicCard>
  );
};
