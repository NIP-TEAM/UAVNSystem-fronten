import { useLanguageContext } from "@/hooks";
import { Button, Flex, Typography } from "antd";
import { FC } from "react";
import { useNavigate } from "react-router";

export interface UavHeaderProp {}

export const UavHeader: FC<UavHeaderProp> = () => {
  const navigate = useNavigate()
  const { LanguageText } = useLanguageContext<"Uav">();

  return (
    <Flex justify="space-between" align="baseline">
      <Typography.Title level={4}>{LanguageText.headerTitle}</Typography.Title>
      <Button type="primary" onClick={() => navigate('/uavs/create')}>
        {LanguageText.createNew}
      </Button>
    </Flex>
  );
};
