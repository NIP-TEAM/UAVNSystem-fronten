import { Button, Card, Checkbox, Flex, Form, Input } from "antd";
import { FC, useEffect, useState } from "react";
import { ButtonNoStyle, LoginCardStyle } from "./style";
import { useConfig } from "../../hooks";
import LoginTextLanguage from "../../language/pages/Login.json";
import { LoginInfo, useLogin } from "../../service";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { ProtocalBox } from "./components";

export interface LoginProp {}

interface FormInfo extends LoginInfo {
  protocolRead: boolean;
}

export const Login: FC<LoginProp> = () => {
  const { useLanguage } = useConfig();
  const LoginText = useLanguage?.(LoginTextLanguage) || {};
  const [form] = Form.useForm<FormInfo>();
  const [{ email, password, protocolRead }, setFormInfo] = useState<
    Partial<FormInfo>
  >({});
  const [readState, setReadState] = useState(true);
  useEffect(() => {
    if (protocolRead) setReadState(true);
  }, [protocolRead]);
  const rules = {
    email: [
      { required: true, message: LoginText.emailEmpty },
      {
        pattern:
          /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
        message: LoginText.emailInvalid,
      },
    ],
    password: [{ required: true, message: LoginText.passwordEmpty }],
    protocolRead: [{ required: true, message: "error" }],
  };
  const handleValuesChange = (_: unknown, allFields: FormInfo) =>
    setFormInfo(allFields);
  const { fetchData, data, loading } = useLogin({ email, password });
  const onFinish = () => {
    if (!protocolRead) {
      return setReadState(false);
    }
    fetchData?.();
  };
  return (
    <Card style={LoginCardStyle}>
      <h1>{LoginText.title}</h1>
      <Form onFinish={onFinish} form={form} onValuesChange={handleValuesChange}>
        <Form.Item name="email" rules={rules.email}>
          <Input prefix={<UserOutlined />} placeholder={LoginText.emailInput} />
        </Form.Item>
        {!!email && (
          <>
            <Form.Item name="password" rules={rules.password}>
              <Input
                prefix={<LockOutlined />}
                type="password"
                placeholder={LoginText.passwordInput}
              />
            </Form.Item>
            <Flex align="center" style={{ margin: "1em 0" }}>
              <Form.Item name="protocolRead" valuePropName="checked" noStyle>
                <Checkbox style={readState ? {} : { color: "red" }}>
                  {LoginText.protocolTip}
                </Checkbox>
              </Form.Item>
              <ProtocalBox />
            </Flex>

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                {LoginText.loginButton}
              </Button>
            </Form.Item>
          </>
        )}
        <Flex gap={10}>
          {!!email && (
            <Button type="link" style={ButtonNoStyle}>
              {LoginText.findPassword}
            </Button>
          )}
          <Button type="link" style={ButtonNoStyle}>
            {LoginText.register}
          </Button>
        </Flex>
      </Form>
    </Card>
  );
};
