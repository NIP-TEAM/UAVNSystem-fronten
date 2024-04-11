import { Card } from "antd";
import { FC, useContext, useEffect, useMemo, useState } from "react";
import { DataList, Filter, UavHeader } from "./components";
import { LanguageProvider } from "@/hooks";
import { FilterType } from "@/pages/Network/NetworkList/types";
import { useUavData, UavDataType } from "@/service/Uav";
import { BasicPagination } from "@/types";
import { SessionKeys, getSessionStorageUtil, sessionStorageUtil } from "@/utils";
import {AppContext} from "@/App";

interface UavListProp {}

// export interface UavDataType {
//   id: string;
//   name: string;
//   uploadSpeed: number;
//   downloadSpeed: number;
//   netWorkId: number;
// }

// const uavList = [
//   {
//       "id": 6,
//       "name": "testName",
//       "status": 1,
//       "createAt": "1712499221556",
//       "userInfoId": 1,
//       "lastEdit": "1712499221556",
//       "merchantId": 1,
//       "uavCount": 0,
//       "creator": {
//           "id": 1,
//           "name": "testAccount"
//       }
//   }
// ]

interface StorageProtocol {
  currentNetwork: number;
  filter: FilterType;
  pagination: BasicPagination;
}

const defaltPagination: BasicPagination = {
  current: 1,
  pageSize: 10,
  total: 10,
};

const sessionKey = SessionKeys.NETWORK;

export const UavList: FC<UavListProp> = () => {
  const [pagination, setPagination] = useState<BasicPagination>(
    getSessionStorageUtil<StorageProtocol>(sessionKey).pagination ||
      defaltPagination
  );
  const [filter, setFilter] = useState<FilterType>(
    getSessionStorageUtil<StorageProtocol>(sessionKey).filter
  );
  const [currentNetwork, setCurrentNetwork] = useState<number>(0);

  const [timestamp, setTimestamp] = useState(0);

  // networkData
  const {
    fetchData: fetchUavData,
    data: uavData,
    loading: uavLoading,
    error: uavError,
    code: uavCode,
  } = useUavData({
    networkId: currentNetwork,
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
  const { messageApi } = useContext(AppContext);
  useEffect(() => {
    if (!uavError) return;
    messageApi?.error(uavError);
  }, [uavError, messageApi]);

  useEffect(() => {
    sessionStorage.removeItem("network-filter");
  }, []);

  const storageFunc = () =>
    sessionStorageUtil(sessionKey, { currentNetwork, filter, pagination });

  return (
    <LanguageProvider textKey="Uav">
      <Card>
        <UavHeader />
        <Filter />
        <DataList />
      </Card>
    </LanguageProvider>
  );
};
