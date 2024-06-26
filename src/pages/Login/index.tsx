import { Button, Card, Checkbox, Flex, Form, Input } from "antd";
import { FC, useContext, useEffect, useState } from "react";
import { ButtonNoStyle, LoginCardStyle } from "./style";
import { useLanguageContext } from "@/hooks";
import { LoginInfo, useLogin } from "@/service";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { ProtocalBox } from "./components";
import { useAtom } from "jotai";
import { userAtom } from "@/store";
import { useNavigate } from "react-router";
import { AppContext } from "@/App";

export interface LoginProp {}

interface FormInfo extends LoginInfo {
  protocolRead: boolean;
}

export const Login: FC<LoginProp> = () => {
  const { messageApi } = useContext(AppContext);
  const { LanguageText } = useLanguageContext<"Login">();
  const [form] = Form.useForm<FormInfo>();
  const navigate = useNavigate();
  const [{ email, password, protocolRead }, setFormInfo] = useState<
    Partial<FormInfo>
  >({});
  const [readState, setReadState] = useState(true);
  useEffect(() => {
    if (protocolRead) setReadState(true);
  }, [protocolRead]);
  const rules = {
    email: [
      { required: true, message: LanguageText.emailEmpty },
      {
        pattern:
          /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
        message: LanguageText.emailInvalid,
      },
    ],
    password: [{ required: true, message: LanguageText.passwordEmpty }],
    protocolRead: [{ required: true, message: "error" }],
  };
  const { fetchData, data, loading, error } = useLogin({ email, password });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setUserInfo] = useAtom(userAtom);
  useEffect(() => {
    if (data?.status === 200) {
      console.log(data.data);
      setUserInfo(data.data);
      messageApi?.success(LanguageText.loginSuccess);
      if (data.data.token) navigate("/dashboard");
    }
  }, [LanguageText.loginSuccess, data, messageApi, navigate, setUserInfo]);
  const onFinish = () => {
    if (!protocolRead) {
      return setReadState(false);
    }
    fetchData?.();
  };

  // Error Handle
  useEffect(() => {
    if (error) {
      messageApi?.error(error);
    }
  }, [error, messageApi]);

  return (
    <Card style={LoginCardStyle}>
      <h1>{LanguageText.title}</h1>
      <Form
        onFinish={onFinish}
        form={form}
        onValuesChange={(_, newValue) => setFormInfo(newValue)}
      >
        <Form.Item name="email" rules={rules.email}>
          <Input
            prefix={<UserOutlined />}
            placeholder={LanguageText.emailInput}
          />
        </Form.Item>
        {!!email && (
          <>
            <Form.Item name="password" rules={rules.password}>
              <Input.Password
                prefix={<LockOutlined />}
                placeholder={LanguageText.passwordInput}
              />
            </Form.Item>
            <Flex align="center" style={{ margin: "1em 0" }}>
              <Form.Item name="protocolRead" valuePropName="checked" noStyle>
                <Checkbox style={readState ? {} : { color: "red" }}>
                  {LanguageText.protocolTip}
                </Checkbox>
              </Form.Item>
              <ProtocalBox />
            </Flex>

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                {LanguageText.loginButton}
              </Button>
            </Form.Item>
          </>
        )}
        <Flex gap={10}>
          {!!email && (
            <Button
              type="link"
              style={ButtonNoStyle}
              onClick={() => navigate("/forget")}
            >
              {LanguageText.findPassword}
            </Button>
          )}
          <Button
            type="link"
            style={ButtonNoStyle}
            onClick={() => navigate("/register")}
          >
            {LanguageText.register}
          </Button>
        </Flex>
      </Form>
    </Card>
  );
};
