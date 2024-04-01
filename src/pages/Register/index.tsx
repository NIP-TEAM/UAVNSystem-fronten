import { Button, Card, Flex, Form, Input } from "antd";
import { FC, useContext, useEffect, useState } from "react";
import { useConfig } from "@/hooks";
import RegisterJson from "@/language/pages/Register.json";
import { RegisterCardStyle } from "./style";
import { Rule } from "rc-field-form/lib/interface";
import { AppContext } from "@/App";
import { RegisterInfo, useRegister, useVerifyCode } from "@/service";
import { useNavigate } from "react-router";

interface RegisterProp {}

interface FormInfo extends RegisterInfo {}

const SECOUNDKEY = "_REGISTER_SECOUND_KEY";

export const Register: FC<RegisterProp> = () => {
  const { useLanguage } = useConfig();
  const [form] = Form.useForm<FormInfo>();
  const { messageApi } = useContext(AppContext);
  const [registerInfo, setRegisterInfo] = useState<Partial<FormInfo>>({});
  const [holdSecond, setHoldSecound] = useState(() =>
    Number(localStorage.getItem(SECOUNDKEY) || 0)
  );
  const navigate = useNavigate();
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
    password: [{ required: true },
    {pattern: /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/, message: RegisterText.passwordInvalid}],
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

  const {
    code: verificationCode,
    fetchData: postVerification,
    error: verificationError,
    loading: verificationLoading,
  } = useVerifyCode({ email: registerInfo.email });
  useEffect(() => {
    if (verificationCode === 200) {
      messageApi?.success(RegisterText.verifySendFeedback);
      setHoldSecound(60);
    }
  }, [verificationCode, messageApi, RegisterText.verifySendFeedback]);

  useEffect(() => {
    if (verificationError) messageApi?.error(verificationError);
  }, [verificationError, messageApi]);

  const {
    code: registerCode,
    fetchData: postRegisterData,
    loading: registerLoading,
    error: registerError,
  } = useRegister({
    ...registerInfo,
    ...{name: registerInfo.name ?? registerInfo.email}
  });

  useEffect(() => {
    if (registerCode === 200) {
      messageApi?.success(RegisterText.registerSuccess);
      setHoldSecound(0)
      setTimeout(() => navigate("/login"), 5000);
    }
  }, [RegisterText.registerSuccess, messageApi, navigate, registerCode]);

  useEffect(() => {
    if (registerError) messageApi?.error(registerError);
  }, [registerError, messageApi]);

  const handleVerify = () => {
    if (!registerInfo.email) messageApi?.error(RegisterText.emailEmpty);
    else {
      const fieldErrors = form.getFieldsError(["email"]);
      if (fieldErrors.some((error) => error.errors.length > 0))
        messageApi?.error(RegisterText.emailInvalid);
      else postVerification?.();
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
    postRegisterData?.();
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
          name="verifyCode"
          rules={rules.verify}
        >
          <Flex gap={5} align="center">
            <Input style={{ width: "30%" }} maxLength={6} />
            <Button
              type="primary"
              onClick={handleVerify}
              disabled={!!holdSecond && !verificationLoading}
              loading={verificationLoading}
            >
              {verificationLoading
                ? RegisterText.verifySending
                : !holdSecond
                ? RegisterText.verifySend
                : `${RegisterText.verifyResend} ${holdSecond}s`}
            </Button>
          </Flex>
        </Form.Item>
        <Form.Item label={RegisterText.nameTitle} name="name">
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
        <Flex gap={3}>
          <Button type="primary" htmlType="submit" loading={registerLoading}>
            {RegisterText.submitButton}
          </Button>
          <Button type="link" onClick={() => navigate("/login")}>
            {RegisterText.loginButton}
          </Button>
        </Flex>
      </Form>
    </Card>
  );
};
