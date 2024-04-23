import { useLanguageContext } from "@/hooks";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Button, Flex } from "antd";
import { FC } from "react";
import { useNavigate } from "react-router";

export interface TabItemHeaderProp {
  contactListId: number;
}

export const TabItemHeader: FC<TabItemHeaderProp> = ({ contactListId }) => {
  const { LanguageText } = useLanguageContext<"Contact">();
  const navigate = useNavigate();

  return (
    <Flex justify="flex-end" align="center">
      <Button type="link" onClick={() => navigate("/contact/" + contactListId)}>
        {LanguageText.toDetail}
        <ArrowRightOutlined />
      </Button>
    </Flex>
  );
};
