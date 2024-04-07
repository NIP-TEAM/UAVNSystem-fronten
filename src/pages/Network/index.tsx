import NetworkJson from "@/language/pages/Network.json";
import { NetworkDataType } from "@/service";
import { Card, Divider, Flex, Typography } from "antd";
import { FC, useState } from "react";
import { CreateModal, DataList, Filter } from "./components";
import { TextProtocol, useConfig } from "@/hooks";
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

type NetworkJsonType = typeof NetworkJson;

export type NetworkLanguageType = TextProtocol<NetworkJsonType>;

export const Network: FC<NetworkProp> = () => {
  const NetworkText = useConfig().useLanguage!("Network");

  const [pagination, setPagination] =
    useState<BasicPagination>(defaltPagination);
  const [filter, setFilter] = useState<string>("");

  return (
      <Card style={{ margin: "0 0.5em" }}>
        <Flex justify="space-between" align="baseline">
          <Typography.Title level={4}>
            {NetworkText.moduleTitle}
          </Typography.Title>
          <CreateModal NetworkText={NetworkText} />
        </Flex>
        <Filter {...{ setFilter, NetworkText }} />
        <Divider />
        <DataList
          {...{ pagination, setPagination, networkData, NetworkText }}
        />
      </Card>
  );
};
