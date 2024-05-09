import { useLanguageContext } from "@/hooks";
import { UserInfo } from "@/store";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Flex, Form, FormProps, Input, Typography } from "antd";
import { FC, ReactNode, useMemo, useState } from "react";

export interface InfoShowcaseProp {
  form: FormProps["form"];
  userInfo: UserInfo;
}

export const InfoShowcase: FC<InfoShowcaseProp> = ({
  form,
  userInfo: { name, id, email, lastLogin, active },
}) => {
  const { LanguageText } = useLanguageContext<"User">();

  const editable = useMemo(() => !!form, [form]);
  const [edit, setEdit] = useState(false);

  return (
    <Form form={form} onFinish={() => console.log("111")}>
      <Flex align="center" justify="center" style={{ height: "40em" }} vertical>
        <Avatar icon={<UserOutlined />} size={384} />

        <FormItem name={LanguageText.nameLabel}>
          {edit ? (
            <Form.Item<UserInfo["name"]> name="name">
              <Input allowClear />
            </Form.Item>
          ) : (
            <Typography.Text>{name}</Typography.Text>
          )}
        </FormItem>
      </Flex>
      {editable && (
        <Flex justify="end" style={{ marginBottom: 5 }} gap={"small"}>
          <Button
            type={edit ? "default" : "primary"}
            onClick={() => setEdit((prev) => !prev)}
          >
            {edit ? LanguageText.editCancel : LanguageText.editButton}
          </Button>
          {edit && (
            <Button type="primary" htmlType="submit">
              {LanguageText.editConfirm}
            </Button>
          )}
        </Flex>
      )}
    </Form>
  );
};

const FormItem: FC<{ name: string; children: ReactNode }> = ({
  name,
  children,
}) => (
  <Flex align="baseline" gap="small" style={{ margin: 3 }}>
    <Typography.Text strong>{name}</Typography.Text>
    {children}
  </Flex>
);
