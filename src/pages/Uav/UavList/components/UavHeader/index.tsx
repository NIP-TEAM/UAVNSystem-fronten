import { useLanguageContext } from "@/hooks";
import { Typography } from "antd";
import { FC } from "react";

export interface UavHeaderProp {}

export const UavHeader: FC<UavHeaderProp> = () => {
  const { LanguageText } = useLanguageContext<"Uav">();
  return (
    <Typography.Title level={4}>{LanguageText.headerTitle}</Typography.Title>
  );
};
