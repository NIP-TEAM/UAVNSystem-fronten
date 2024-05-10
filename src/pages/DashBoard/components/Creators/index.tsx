import { AppContext } from "@/App";
import { BasicCard } from "@/components";
import { useLanguageContext } from "@/hooks";
import { useGetUsers } from "@/service";
import { UserInfo } from "@/store";
import { basicTimeFormate } from "@/utils";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Badge, Card, Flex, Typography } from "antd";
import { FC, useContext, useEffect, useMemo } from "react";
import { useNavigate } from "react-router";

export interface CreatorsProp {}

export const Creators: FC<CreatorsProp> = () => {
  const { messageApi } = useContext(AppContext);
  const { LanguageText } = useLanguageContext<"Dashboard">();

  const {
    fetchData: fetchUsers,
    error: usersError,
    code: usersCode,
    data: usersDataData,
    loading: usersLoading,
  } = useGetUsers({ take: 5 });
  useEffect(() => {
    if (usersError) messageApi?.error(usersError);
  }, [usersError, messageApi]);
  useEffect(
    () => {
      fetchUsers?.();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const usersData = useMemo<UserInfo[]>(() => {
    if (usersCode === 200 && usersDataData?.data) return usersDataData?.data;
    return [];
  }, [usersCode, usersDataData?.data]);

  return (
    <BasicCard hoverable loading={usersLoading}>
      <Typography.Title level={5} style={{ marginTop: 0 }}>
        {LanguageText.usersTitle}
      </Typography.Title>
      <Flex vertical gap={3}>
        {usersData.map((item) => (
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
    <Card hoverable onClick={() => navigate("/user/" + id)}>
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
