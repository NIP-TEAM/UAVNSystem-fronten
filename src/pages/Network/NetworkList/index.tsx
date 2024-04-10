import { NetworkDataType, useNetworkData } from "@/service";
import { Card, Divider } from "antd";
import { FC, useContext, useEffect, useMemo, useState } from "react";
import { DataList, Filter, NetworkHeader } from "./components";
import { LanguageProvider } from "@/hooks";
import { BasicPagination } from "@/types";
import { AppContext } from "@/App";
import { FilterType } from "./types";
import { SessionKeys, getSessionStorageUtil, sessionStorageUtil } from "@/utils";

interface NetworkListProp {}

interface StorageProtocol {
  filter: FilterType;
  pagination: BasicPagination;
}

const defaltPagination: BasicPagination = {
  current: 1,
  pageSize: 10,
  total: 10,
};

const sessionKey = SessionKeys.NETWORK

export const NetworkList: FC<NetworkListProp> = () => {
  const [pagination, setPagination] = useState<BasicPagination>(
    getSessionStorageUtil<StorageProtocol>(sessionKey).pagination || defaltPagination
  );
  const [filter, setFilter] = useState<FilterType>(
    getSessionStorageUtil<StorageProtocol>(sessionKey).filter
  );

  const [timestamp, setTimestamp] = useState(0);

  // networkData
  const { fetchData, data, loading, error, code } = useNetworkData({
    pagination,
    filter: JSON.stringify(filter || {}),
  });
  const networkData = useMemo<NetworkDataType[]>(() => {
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
    sessionStorage.removeItem("network-filter");
  }, []);

  const storageFunc = () =>
    sessionStorageUtil(sessionKey, { filter, pagination });

  return (
    <LanguageProvider textKey="Network">
      <Card style={{ margin: "0 0.5em" }}>
        <NetworkHeader />
        <Filter {...{ setFilter, setTimestamp, initParams: filter }} />
        <Divider />
        <DataList
          {...{
            pagination,
            setPagination,
            networkData,
            loading,
            setTimestamp,
            setFilter,
            initSorter: filter?.sorter,
            storageFunc,
          }}
        />
      </Card>
    </LanguageProvider>
  );
};
