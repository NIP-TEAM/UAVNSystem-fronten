import { BasicCard } from "@/components";
import { useLanguageContext } from "@/hooks";
import { UserInfo } from "@/store";
import { basicTimeFormate } from "@/utils";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Badge, Card, Flex, Typography } from "antd";
import { FC } from "react";
import { useNavigate } from "react-router";
import { useDashboardGlobalContext } from "../../hooks";

export interface CreatorsProp {}

export const Creators: FC<CreatorsProp> = () => {
  const { LanguageText } = useLanguageContext<"Dashboard">();
  const {
    dashboardData: { creators = [] },
    dashboardLoading
  } = useDashboardGlobalContext();

  return (
    <BasicCard hoverable loading={dashboardLoading}>
      <Typography.Title level={5} style={{ marginTop: 0 }}>
        {LanguageText.usersTitle}
      </Typography.Title>
      <Flex vertical gap={3}>
        {creators.map((item) => (
          <UserCard key={item.id} {...item} />
        ))}
      </Flex>
    </BasicCard>
  );
};

const UserCard: FC<UserInfo> = ({ id, name, email, lastLogin, active }) => {
  const navigate = useNavigate();
  const { LanguageText } = useLanguageContext<"Dashboard">();

  return (
    <Card hoverable onClick={() => navigate("/user/" + id)} >
      <Flex align="center" justify="space-between">
        <Flex gap={"small"}>
          <Avatar size={64} icon={<UserOutlined />} />
          <Flex justify="space-between" vertical gap={"small"}>
            <Flex vertical justify="baseline">
              <Typography.Text strong ellipsis>
                {name}
              </Typography.Text>
              <Typography.Text type="secondary" ellipsis>
                {email}
              </Typography.Text>
            </Flex>
            <Typography.Text type="secondary">
              {LanguageText.lastLoginLabel} {basicTimeFormate(lastLogin)}
            </Typography.Text>
          </Flex>
        </Flex>
        <Badge status={active ? "success" : "error"} />
      </Flex>
    </Card>
  );
};
