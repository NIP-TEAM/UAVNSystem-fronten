import { useLanguageContext } from "@/hooks";
import { Button, Flex, Typography } from "antd";
import { FC } from "react";
import { useNavigate } from "react-router";

export interface HeaderProp {}

export const Header: FC<HeaderProp> = () => {
  const navigate = useNavigate();
  const { LanguageText } = useLanguageContext<"Contact">();

  return (
    <Flex align="center" justify="space-between">
      <Typography.Title level={4}>{LanguageText.emailTitle}</Typography.Title>
      <Button type="primary" onClick={() => navigate("/contact/create")}>
        {LanguageText.createContactButton}
      </Button>
    </Flex>
  );
};
