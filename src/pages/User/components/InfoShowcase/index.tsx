import { UserInfo } from "@/store";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Flex, Form, FormProps } from "antd";
import { FC, useMemo, useState } from "react";

export interface InfoShowcaseProp {
  form: FormProps["form"];
  userInfo: UserInfo;
}

export const InfoShowcase: FC<InfoShowcaseProp> = ({
  form,
  userInfo: { name, id, email, lastLogin, active },
}) => {
  const editable = useMemo(() => !!form, [form]);
  const [edit, setEdit] = useState(false);

  return (
    <Flex align="center" justify="center" style={{ height: "40em" }}>
      <Form form={form}>
        <Avatar icon={<UserOutlined />} size={384} />
      </Form>
    </Flex>
  );
};
