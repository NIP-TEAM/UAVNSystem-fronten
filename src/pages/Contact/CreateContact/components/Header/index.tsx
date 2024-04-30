import { useLanguageContext } from "@/hooks";
import { Flex, Typography } from "antd";
import { FC } from "react";
import { ImportModal } from "./components";

export interface HeaderProp {}

export const Header: FC<HeaderProp> = () => {
  const { LanguageText } = useLanguageContext<"CreateContact">();

  return (
    <>
      <Flex align="baseline" justify="space-between">
        <Typography.Title level={4}>
          {LanguageText.createTitle}
        </Typography.Title>
        <ImportModal />
      </Flex>
    </>
  );
};
