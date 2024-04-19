import { AppContext } from "@/App";
import { BasicCard, NetworkStructure } from "@/components";
import { useLanguageContext } from "@/hooks";
import { NetworkDataType, useNetworkData } from "@/service";
import { BasicPagination } from "@/types";
import { Flex, Typography } from "antd";
import { FC, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";

export interface NetworksStructureProp {}

const defaultPagination: BasicPagination = {
  current: 1,
  pageSize: 10,
  total: 10,
} as const;

const pageSize = 10;

export const NetworksStructure: FC<NetworksStructureProp> = () => {
  const { messageApi } = useContext(AppContext);
  const navigate = useNavigate();
  const { LanguageText } = useLanguageContext<"Dashboard">();

  const [pagination, setPagination] = useState(defaultPagination);

  const {
    fetchData: fetchNetworkData,
    code: networkCode,
    error: networkError,
    data: networkDataData,
    loading: networkLoading,
  } = useNetworkData({
    pagination,
    filter: "",
    selectKeys: JSON.stringify([
      "uavs",
      "connectMap",
    ] as (keyof NetworkDataType)[]),
  });
  useEffect(() => {
    fetchNetworkData?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (networkError) messageApi?.error(networkError);
  }, [messageApi, networkError]);
  const networkData = useMemo<NetworkDataType[]>(() => {
    if (networkCode === 200 && networkDataData?.data)
      return networkDataData?.data;
    return [];
  }, [networkCode, networkDataData?.data]);

  return (
    <BasicCard
      hoverable
      loading={networkLoading}
      onClick={() => navigate("/network")}
    >
      <Typography.Title level={5} style={{ marginTop: 0 }}>
        {LanguageText.structureTitle}
      </Typography.Title>
      <Flex
        style={{ width: "100%", overflowX: "auto", padding: "1em 0" }}
        gap="small"
      >
        {networkData.map(({ connectMap, uavs, id, name }) => (
          <BasicCard
            key={id}
            hoverable
            onClick={(e) => {
              e.stopPropagation();
              navigate("/network/" + id);
            }}
          >
            <Typography.Text strong>{name}</Typography.Text>
            <NetworkStructure
              {...{
                connectMap,
                style: { width: "24em", height: "16em", cursor: "pointer" },
                uavs,
              }}
            />
          </BasicCard>
        ))}
      </Flex>
    </BasicCard>
  );
};
