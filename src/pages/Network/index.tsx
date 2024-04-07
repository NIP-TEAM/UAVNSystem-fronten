import { NetworkDataType, useNetworkData } from "@/service";
import { Card, Divider } from "antd";
import { FC, useContext, useEffect, useMemo, useState } from "react";
import { DataList, Filter, NetworkHeader } from "./components";
import { LanguageProvider } from "@/hooks";
import { BasicPagination } from "@/types";
import { AppContext } from "@/App";

interface NetworkProp {}

// const networkData: NetworkDataType[] = Array.from({ length: 100 }).fill({
//   id: "1",
//   name: "test1",
//   status: 1,
//   createAt: new Date().getTime().toString(),
//   lastEdit: new Date().getTime().toString(),
//   uavCount: 12,
//   creator: {
//     name: "test",
//     id: "1",
//   },
// }) as NetworkDataType[];

const defaltPagination: BasicPagination = {
  current: 1,
  pageSize: 10,
  total: 10,
};

export const Network: FC<NetworkProp> = () => {
  const [pagination, setPagination] =
    useState<BasicPagination>(defaltPagination);
  const [filter, setFilter] = useState("");

  // networkData
  const { fetchData, data, loading, error, code } = useNetworkData({
    pagination,
    filter,
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
  }, [pagination.current, pagination.pageSize, filter]);
  const { messageApi } = useContext(AppContext);
  useEffect(() => {
    if (!error) return;
    messageApi?.error(error);
  }, [error, messageApi]);

  return (
    <LanguageProvider textKey="Network">
      <Card style={{ margin: "0 0.5em" }}>
        <NetworkHeader />
        <Filter {...{ setFilter }} />
        <Divider />
        <DataList {...{ pagination, setPagination, networkData, loading }} />
      </Card>
    </LanguageProvider>
  );
};
