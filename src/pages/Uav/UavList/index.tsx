import { FC, useEffect, useMemo, useState } from "react";
import { DataList, Filter, UavHeader } from "./components";
import { FilterType } from "@/pages/Network/NetworkList/types";
import { useUavData, UavDataType } from "@/service/Uav";
import { BasicPagination, defaultPagination } from "@/types";
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

const sessionKey = SessionKeys.UAV;

export const UavList: FC<UavListProp> = () => {
  const [pagination, setPagination] = useState<BasicPagination>(
    getSessionStorageUtil<StorageProtocol>(sessionKey)?.pagination ||
      defaultPagination
  );
  const [filter, setFilter] = useState<FilterType>(
    getSessionStorageUtil<StorageProtocol>(sessionKey)?.filter || {}
  );

  const [timestamp, setTimestamp] = useState(0);

  // networkData
  const {
    fetchData: fetchUavData,
    data: uavData,
    loading: uavLoading,
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
    sessionStorage.removeItem(sessionKey);
  }, []);

  const storageFunc = () =>
    sessionStorageUtil(sessionKey, { filter, pagination });

  return (
    <BasicCard>
      <UavHeader />
      <Filter {...{ setTimestamp, setFilter }} />
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
  );
};
