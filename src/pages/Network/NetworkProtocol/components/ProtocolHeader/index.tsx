import { useLanguageContext } from "@/hooks";
import { Typography } from "antd";
import { FC } from "react";

export interface ProtocolHeaderProp {}

export const ProtocolHeader: FC<ProtocolHeaderProp> = () => {
  const { LanguageText } = useLanguageContext<"NetworkProtocol">();
  return (
    <Typography.Title level={4}>
        {LanguageText.protocolTitle}
    </Typography.Title>
  );
};
