import { Flex, Typography } from "antd";
import { FC } from "react";
import { CreateModal, CreateModalProp } from "..";
import { useLanguageContext } from "@/hooks";

interface NetworkHeader extends CreateModalProp {}

export const NetworkHeader: FC<NetworkHeader> = ({
  refreshNetwork,
}) => {
  const { LanguageText } = useLanguageContext<"Network">();
  return (
    <Flex justify="space-between" align="baseline">
      <Typography.Title level={4}>{LanguageText.moduleTitle}</Typography.Title>
      <CreateModal refreshNetwork={refreshNetwork} />
    </Flex>
  );
};
