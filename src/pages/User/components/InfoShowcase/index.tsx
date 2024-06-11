import { AppContext } from "@/App";
import { useLanguageContext } from "@/hooks";
import { useUpdateUser } from "@/service";
import { UserInfo } from "@/store";
import { basicTimeFormate } from "@/utils";
import { UserOutlined } from "@ant-design/icons";
import {
  Avatar,
  Badge,
  Button,
  Descriptions,
  DescriptionsProps,
  Flex,
  Form,
  FormProps,
  Input,
  Typography,
} from "antd";
import { FC, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";

export interface InfoShowcaseProp {
  form?: FormProps["form"];
  userInfo: UserInfo;
}

export const InfoShowcase: FC<InfoShowcaseProp> = ({
  form,
  userInfo: { name, id, email, lastLogin, active },
}) => {
  const { messageApi } = useContext(AppContext);
  const { LanguageText } = useLanguageContext<"User">();
  const navigate = useNavigate();

  const editable = useMemo(() => !!form, [form]);
  const [edit, setEdit] = useState(false);
  const formValue = Form.useWatch([], form);

  const {
    fetchData: fetchUpdate,
    error: updateError,
    code: updateCode,
    loading: updateLoading,
  } = useUpdateUser(formValue);
  useEffect(() => {
    if (updateError) messageApi?.error(updateError);
  }, [updateError, messageApi]);
  useEffect(() => {
    if (updateCode === 200) {
      messageApi?.success(LanguageText.updateSuccess);
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  }, [LanguageText.updateSuccess, messageApi, navigate, updateCode]);

  const items: DescriptionsProps["items"] = [
    {
      key: "name",
      label: LanguageText.nameLabel,
      children: edit ? (
        <Form.Item<UserInfo["name"]> name="name">
          <Input allowClear />
        </Form.Item>
      ) : (
        <Typography.Text>{name}</Typography.Text>
      ),
    },
    {
      key: "email",
      label: LanguageText.emailLabel,
      children: edit ? (
        <Form.Item<UserInfo["email"]>
          name="email"
          rules={[
            {
              pattern:
                /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
              message: LanguageText.emailInvalid,
            },
          ]}
        >
          <Input allowClear />
        </Form.Item>
      ) : (
        <Typography.Text>{email}</Typography.Text>
      ),
    },
    {
      key: "id",
      label: LanguageText.idLabel,
      children: (
        <Typography.Text type={edit ? "secondary" : undefined}>
          {id}
        </Typography.Text>
      ),
    },
    {
      key: "lastLogin",
      label: LanguageText.lastLoginLabel,
      children: (
        <Typography.Text type={edit ? "secondary" : undefined}>
          {basicTimeFormate(lastLogin)}
        </Typography.Text>
      ),
    },
    {
      key: "active",
      label: LanguageText.lastLoginLabel,
      span: 2,
      children: <Badge status={active ? "success" : "error"} />,
    },
    ...(edit
      ? [
          {
            key: "password",
            span: 2,
            children: (
              <Form.Item<UserInfo["password"]>
                label={LanguageText.passwordLabel}
                name="password"
                rules={[
                  {
                    pattern: /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/,
                    message: LanguageText.passwordInvalid,
                  },
                ]}
                style={{ width: "100%" }}
              >
                <Input.Password />
              </Form.Item>
            ),
          },
          {
            key: "confirmPassword",
            span: 2,
            children: (
              <Form.Item
                label={LanguageText.confirmPasswordLabel}
                name="passwordConfirm"
                dependencies={["password"]}
                rules={[
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (
                        getFieldValue("password") === value ||
                        !getFieldValue("password")
                      ) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(LanguageText.confirmPasswordInvalid)
                      );
                    },
                  }),
                ]}
                style={{ width: "100%" }}
              >
                <Input.Password />
              </Form.Item>
            ),
          },
        ]
      : []),
  ];

  useEffect(() => {
    form?.setFieldsValue({
      name,
      id,
      email,
      lastLogin,
      active,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Form form={form} onFinish={() => fetchUpdate?.()}>
      <Flex align="center" vertical gap={"large"}>
        <Avatar icon={<UserOutlined />} size={384} />
        <Descriptions items={items} style={{ width: "40em" }} column={2} />
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
            <Button type="primary" htmlType="submit" loading={updateLoading}>
              {LanguageText.editConfirm}
            </Button>
          )}
        </Flex>
      )}
    </Form>
  );
};
