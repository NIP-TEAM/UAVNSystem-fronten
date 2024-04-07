import { NetworkDataType } from "@/service";
import { Card, Divider } from "antd";
import { FC, useState } from "react";
import { DataList, Filter, NetworkHeader } from "./components";
import { LanguageProvider } from "@/hooks";
import { BasicPagination } from "@/types";

interface NetworkProp {}

const networkData: NetworkDataType[] = Array.from({ length: 100 }).fill({
  id: "1",
  name: "test1",
  status: 1,
  createAt: new Date().getTime().toString(),
  lastEdit: new Date().getTime().toString(),
  uavCount: 12,
  creator: {
    name: "test",
    id: "1",
  },
}) as NetworkDataType[];

const defaltPagination: BasicPagination = {
  current: 1,
  pageSize: 10,
  total: networkData.length,
};

export const Network: FC<NetworkProp> = () => {
  const [pagination, setPagination] =
    useState<BasicPagination>(defaltPagination);
  const [filter, setFilter] = useState("");

  return (
    <LanguageProvider textKey="Network">
      <Card style={{ margin: "0 0.5em" }}>
        <NetworkHeader />
        <Filter {...{ setFilter }} />
        <Divider />
        <DataList {...{ pagination, setPagination, networkData }} />
      </Card>
    </LanguageProvider>
  );
};
