import { Button, Card, Flex, Form, Input } from "antd";
import { FC, useContext, useEffect, useState } from "react";
import { useConfig } from "../../hooks";
import RegisterJson from "../../language/pages/Register.json";
import { RegisterCardStyle } from "./style";
import { Rule } from "rc-field-form/lib/interface";
import { AppContext } from "../../App";

interface RegisterProp {}

interface FormInfo {
  email: string;
  password: string;
  rePassword: string;
  verify: number;
  avatar: string;
  name: string;
}

const SECOUNDKEY = "_SECOUND_KEY";

export const Register: FC<RegisterProp> = () => {
  const { useLanguage } = useConfig();
  const [form] = Form.useForm<FormInfo>();
  const { messageApi } = useContext(AppContext);
  const [registerInfo, setRegisterInfo] = useState<Partial<FormInfo>>({});
  const [holdSecond, setHoldSecound] = useState(() =>
    Number(localStorage.getItem(SECOUNDKEY) || 0)
  );
  const RegisterText = useLanguage?.(RegisterJson) || {};

  const rules: Record<string, Rule[]> = {
    email: [
      { required: true, message: RegisterText.emailEmpty },
      {
        pattern:
          /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
        message: RegisterText.emailInvalid,
      },
    ],
    verify: [
      { required: true, message: RegisterText.verifyCodeEmpty },
      { pattern: /^\d+$/, message: RegisterText.verifyCodeInvalid },
    ],
    password: [{ required: true }],
    passwordConfirm: [
      {
        required: true,
      },
      ({ getFieldValue }) => ({
        validator(_, value) {
          if (!value || getFieldValue("password") === value) {
            return Promise.resolve();
          }
          return Promise.reject(new Error(RegisterText.confirmPasswordInvalid));
        },
      }),
    ],
  };

  const handleVerify = () => {
    if (!registerInfo.email) messageApi?.error(RegisterText.emailEmpty);
    else {
      const fieldErrors = form.getFieldsError(["email"]);
      if (fieldErrors.some((error) => error.errors.length > 0))
        messageApi?.error(RegisterText.emailInvalid);
      else {
        console.log("111");
        setHoldSecound(60);
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setHoldSecound((prevSeconds) => {
        const result = prevSeconds - 1;
        localStorage.setItem(SECOUNDKEY, result.toString());
        return result;
      });
    }, 1000);
    if (!holdSecond) {
      localStorage.removeItem(SECOUNDKEY);
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [holdSecond]);

  const onFinish = () => {
    console.log("111");
  };

  return (
    <Card style={RegisterCardStyle}>
      <h1>{RegisterText.title}</h1>
      <Form
        form={form}
        onValuesChange={(_, newValue) => setRegisterInfo(newValue)}
        autoComplete="off"
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          label={RegisterText.emailTitle}
          name="email"
          rules={rules.email}
        >
          <Input style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          label={RegisterText.verifyTitle}
          name="verify"
          rules={rules.verify}
        >
          <Flex gap={5} align="center">
            <Input style={{ width: "30%" }} maxLength={6} />
            <Button
              type="primary"
              onClick={handleVerify}
              disabled={!!holdSecond}
            >
              {!holdSecond
                ? RegisterText.verifySend
                : `${RegisterText.verifyResend} ${holdSecond}s`}
            </Button>
          </Flex>
        </Form.Item>
        <Form.Item label={RegisterText.avatarTitle} name="avatar">
          <div>111</div>
        </Form.Item>
        <Form.Item label={RegisterText.nameTitle} name="username">
          <Input style={{ width: "50%" }} />
        </Form.Item>
        <Form.Item
          label={RegisterText.passwordTitle}
          name="password"
          rules={rules.password}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label={RegisterText.confirmTitle}
          name="passwordConfirm"
          dependencies={["password"]}
          rules={rules.passwordConfirm}
        >
          <Input.Password />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          {RegisterText.submitButton}
        </Button>
      </Form>
    </Card>
  );
};
