import { FC, useContext, useEffect, useMemo, useState } from "react";
import { DataList, Filter, UavHeader } from "./components";
import { LanguageProvider } from "@/hooks";
import { AppContext } from "@/App";
import { FilterType } from "@/pages/Network/NetworkList/types";
import { useUavData, UavDataType } from "@/service/Uav";
import { BasicPagination } from "@/types";
import {
  SessionKeys,
  getSessionStorageUtil,
  sessionStorageUtil,
} from "@/utils";
import { BasicCard } from "@/components";

interface UavListProp {}

interface StorageProtocol {
  filter: FilterType;
  pagination: BasicPagination;
}

const defaltPagination: BasicPagination = {
  current: 1,
  pageSize: 10,
  total: 10,
};

const sessionKey = SessionKeys.UAV;

export const UavList: FC<UavListProp> = () => {
  const { messageApi } = useContext(AppContext);

  const [pagination, setPagination] = useState<BasicPagination>(
    getSessionStorageUtil<StorageProtocol>(sessionKey).pagination ||
      defaltPagination
  );
  const [filter, setFilter] = useState<FilterType>(
    getSessionStorageUtil<StorageProtocol>(sessionKey).filter
  );

  const [timestamp, setTimestamp] = useState(0);

  // networkData
  const {
    fetchData: fetchUavData,
    data: uavData,
    loading: uavLoading,
    error: uavError,
    code: uavCode,
  } = useUavData({
    pagination,
    filter: JSON.stringify(filter || {}),
  });
  const uavListData = useMemo<UavDataType[]>(() => {
    if (uavCode === 200 && uavData?.data) {
      setPagination((prev) => ({ ...prev, ...uavData.meta.pagination }));
      return uavData.data;
    }
    return [];
  }, [uavCode, uavData]);
  useEffect(() => {
    fetchUavData?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.current, pagination.pageSize, timestamp]);
  useEffect(() => {
    if (!uavError) return;
    messageApi?.error(uavError);
  }, [uavError, messageApi]);

  useEffect(() => {
    sessionStorage.removeItem(sessionKey);
  }, []);

  const storageFunc = () =>
    sessionStorageUtil(sessionKey, { filter, pagination });

  return (
    <LanguageProvider textKey="Uav">
      <BasicCard>
        <UavHeader />
        <Filter />
        <DataList
          {...{
            uavLoading,
            uavListData,
            storageFunc,
            setFilter,
            pagination,
            setTimestamp,
            setPagination,
          }}
        />
      </BasicCard>
    </LanguageProvider>
  );
};
