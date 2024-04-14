import { useLanguageContext } from "@/hooks";
import { Typography } from "antd";
import { FC } from "react";

export interface NetworkDetailHeaderProp {
    name?: string
}

export const NetworkDetailHeader: FC<NetworkDetailHeaderProp> = ({name}) => {
  const { LanguageText } = useLanguageContext<"NetworkDetail">();

  return (
    <Typography.Title level={4}>
      {LanguageText.detailTitle}: {name}
    </Typography.Title>
  );
};
