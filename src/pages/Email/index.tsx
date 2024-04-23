import { BasicCard } from "@/components";
import { useLanguageContext } from "@/hooks";
import { Typography } from "antd";
import { FC } from "react";

interface EmailProp {}

export const Email: FC<EmailProp> = () => {
  const { LanguageText } = useLanguageContext<"Email">();
  return (
    <BasicCard>
      <Typography.Title level={4}>{LanguageText.emailTitle}</Typography.Title>
    </BasicCard>
  );
};
