import { useLanguageContext } from "@/hooks";
import { Typography } from "antd";
import { FC } from "react";

export interface StructureHeaderProp {}

export const StructureHeader: FC<StructureHeaderProp> = () => {
  const { LanguageText } = useLanguageContext<"NetworkStructure">();
  return (
    <Typography.Title level={4}>
        {LanguageText.structureTitle}
    </Typography.Title>
  );
};
