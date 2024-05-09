import { UserInfo } from "@/store";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Form, FormProps } from "antd";
import { FC, useMemo, useState } from "react";

export interface InfoShowcaseProp {
  form: FormProps["form"];
  userInfo: UserInfo
}

export const InfoShowcase: FC<InfoShowcaseProp> = ({ form, userInfo: {name, id, email,lastLogin} }) => {
  const editable = useMemo(() => !!form, [form]);
  const [edit, setEdit] = useState(false)

  return (
    <Form form={form}>
      <Avatar icon={<UserOutlined />} />
    </Form>
  );
};
