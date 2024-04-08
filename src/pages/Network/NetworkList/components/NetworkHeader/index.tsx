import { Flex, Typography } from "antd";
import { FC } from "react";
import { CreateModal } from "..";
import { useLanguageContext } from "@/hooks";

interface NetworkHeader {}

export const NetworkHeader: FC<NetworkHeader> = () => {
  const { LanguageText } = useLanguageContext<"Network">();
  return (
    <Flex justify="space-between" align="baseline">
      <Typography.Title level={4}>{LanguageText.moduleTitle}</Typography.Title>
      <CreateModal />
    </Flex>
  );
};
