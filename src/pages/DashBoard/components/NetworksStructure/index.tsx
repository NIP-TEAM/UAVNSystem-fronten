import { BasicCard, NetworkStructure } from "@/components";
import { useLanguageContext } from "@/hooks";
import { Empty, Flex, Typography } from "antd";
import { FC } from "react";
import { useNavigate } from "react-router";
import { useDashboardGlobalContext } from "../../hooks";

export interface NetworksStructureProp {}

export const NetworksStructure: FC<NetworksStructureProp> = () => {
  const navigate = useNavigate();
  const { LanguageText } = useLanguageContext<"Dashboard">();
  const {
    dashboardData: {networkStructures = []},
    dashboardLoading
  } = useDashboardGlobalContext()

  return (
    <BasicCard
      hoverable
      loading={dashboardLoading}
      onClick={() => navigate("/network")}
    >
      <Typography.Title level={5} style={{ marginTop: 0 }}>
        {LanguageText.structureTitle}
      </Typography.Title>
      <Flex
        style={{ width: "100%", overflowX: "auto", padding: "1em 0" }}
        gap="small"
      >
        {networkStructures.length ? networkStructures.map(({ connectMap, uavs, id, name }) => (
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
        )) : <Empty description={LanguageText.visualDataEmpty} />}
      </Flex>
    </BasicCard>
  );
};
