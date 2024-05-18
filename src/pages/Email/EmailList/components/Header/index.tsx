import { useLanguageContext } from "@/hooks";
import { Button, Flex, Typography } from "antd";
import { FC } from "react";
import { useNavigate } from "react-router";

export interface HeaderProp {}

export const Header: FC<HeaderProp> = () => {
  const navigate = useNavigate();
  const { LanguageText } = useLanguageContext<"Email">();
  return (
    <Flex justify="space-between" align="enter">
      <Typography.Title level={4} style={{ marginTop: 0 }}>
        {LanguageText.EmailListTitle}
      </Typography.Title>
      <Button type="primary" onClick={() => navigate("/email/create")}>
        {LanguageText.EmailCreateButton}
      </Button>
    </Flex>
  );
};
