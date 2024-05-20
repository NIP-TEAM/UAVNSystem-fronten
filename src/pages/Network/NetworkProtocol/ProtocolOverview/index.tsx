import { BasicCard } from "@/components";
import { FC, useEffect, useMemo, useState } from "react";
import { ProtocolHeader, ProtocolList } from "./components";
import { Divider } from "antd";
import { ProtocolDataType, useNetworkProtocol } from "@/service";
import { BasicPagination, defaultPagination } from "@/types";
import { FilterType } from "../types";
import {
  SessionKeys,
  getSessionStorageUtil,
  sessionStorageUtil,
} from "@/utils";

export interface NetworkTypeProp {}

const sessionKey = SessionKeys.PROTOCOL;

const protocolData: ProtocolDataType[] = [
  {
    id: 1,
    name: "test",
    type: "customer",
    createAt: new Date().getTime().toString(),
    updateAt: new Date().getTime().toString(),
    networks: [
      { name: "test1", id: 1 },
      { name: "test2", id: 2 },
      { name: "test3", id: 3 },
    ],
    creator: { name: "creator1", id: 1 },
    feature: ["feature1"],
  },
  {
    id: 2,
    name: "test1",
    type: "DCR",
    createAt: new Date().getTime().toString(),
    updateAt: new Date().getTime().toString(),
    feature: ["feature1"],
  },
  {
    id: 3,
    name: "test2",
    type: "LCAD",
    createAt: new Date().getTime().toString(),
    updateAt: new Date().getTime().toString(),
    feature: ["feature1"],
  },
];

const loading = false;

export const NetworkProtocol: FC<NetworkTypeProp> = () => {
  const [filter, setFilter] = useState<FilterType>(
    getSessionStorageUtil<FilterType>(SessionKeys.PROTOCOL) || {}
  );
  const [pagination, setPagination] =
    useState<BasicPagination>(defaultPagination);
  // const { fetchData, data, loading, error, code } = useNetworkProtocol({
  //   pagination,
  //   filter: JSON.stringify(filter || {}),
  // });
  // const protocolData = useMemo<NetworkProtocal[]>(() => {
  //   if (code === 200 && data?.data) {
  //     setPagination((prev) => ({ ...prev, ...data.meta.pagination }));
  //     return data.data;
  //   }
  //   return [];
  // }, [code, data]);
  // useEffect(() => {
  //   fetchData?.();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [pagination.current, pagination.pageSize, timestamp]);
  // const { messageApi } = useContext(AppContext);
  // useEffect(() => {
  //   if (!error) return;
  //   messageApi?.error(error);
  // }, [error, messageApi]);
  const storageFunc = () => sessionStorageUtil(sessionKey, filter);

  useEffect(() => {
    sessionStorage.removeItem(SessionKeys.PROTOCOL)
  }, [])

  return (
    <BasicCard style={{ overflowX: "auto" }}>
      <ProtocolHeader {...{ setFilter }} />
      <Divider />
      <ProtocolList
        {...{ protocolData, pagination, setPagination, loading, storageFunc }}
      />
    </BasicCard>
  );
};
