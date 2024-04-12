import { useLanguageContext } from "@/hooks";
import { Flex, Typography } from "antd";
import { FC } from "react";
import { CsvModal } from "./components";

export interface CreateUavHeaderProp {}

export const CreateUavHeader: FC<CreateUavHeaderProp> = () => {
  const { LanguageText } = useLanguageContext<"Uav">();
  return (
    <Flex justify="space-between" align="baseline" >
        <Typography.Title level={4}>{LanguageText.createNew}</Typography.Title>
        <CsvModal />
    </Flex>
  );
};
