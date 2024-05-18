import { BasicCard } from "@/components";
import { TextKeys, useLanguageContext } from "@/hooks";
import { DashboardDataType } from "@/service";
import { Card, Flex, Typography } from "antd";
import { FC } from "react";
import { useDashboardGlobalContext } from "../../hooks";
import { useNavigate } from "react-router";

export interface CountDataProp {}

const NavigateTo: Record<keyof DashboardDataType["countData"], string> = {
  uavCount: "/uavs",
  networkCount: "/network",
  creatorCount: "/user",
  protocolCount: "/network/protocol",
  emailCount: "/email/list",
  contactCount: "/email/contact",
} as const;

export const CountData: FC<CountDataProp> = () => {
  const navigate = useNavigate();
  const { LanguageText } = useLanguageContext<"Dashboard">();
  const {
    dashboardData: { countData = {} as DashboardDataType },
    dashboardLoading,
  } = useDashboardGlobalContext();

  return (
    <BasicCard style={{ height: "100%" }} hoverable loading={dashboardLoading}>
      <Typography.Title level={5} style={{ marginTop: 0 }}>
        {LanguageText.dataTitle}
      </Typography.Title>
      <Flex gap="small" wrap="wrap">
        {Object.entries(countData).map(([textKey, value]) => (
          <Card
            key={textKey}
            style={{ width: 125, height: 125 }}
            hoverable
            onClick={() =>
              navigate(
                NavigateTo[textKey as keyof DashboardDataType["countData"]]
              )
            }
          >
            <Flex
              align="center"
              justify="center"
              style={{ width: "100%", height: '100%' }}
              vertical
            >
              <Typography.Text strong ellipsis>
                {LanguageText[textKey as TextKeys<"Dashboard">]}
              </Typography.Text>
              <Flex align="center" justify="center" style={{width: '100%', height: 75}}>
              <Typography.Text style={{fontSize: 32}}>{value}</Typography.Text>
            </Flex>
            </Flex>
          </Card>
        ))}
      </Flex>
    </BasicCard>
  );
};
