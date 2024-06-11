import { useLanguageContext } from "@/hooks";
import { Flex, Typography } from "antd";
import { FC } from "react";

export interface HeaderProp {}

export const Header: FC<HeaderProp> = () => {
  const { LanguageText } = useLanguageContext<"CreateEmail">();

  return (
    <Flex align="baseline" justify="space-between">
      <Typography.Title level={4}>
        {LanguageText.EmailCreateTitle}
      </Typography.Title>
    </Flex>
  );
};
