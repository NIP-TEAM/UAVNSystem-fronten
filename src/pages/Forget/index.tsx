import { Button, Card, Flex, Form, Input } from "antd";
import { FC, useContext, useEffect, useState } from "react";
import { useConfig } from "@/hooks";
import { ForgetCardStyle } from "./style";
import { Rule } from "rc-field-form/lib/interface";
import { AppContext } from "@/App";
import { ForgetInfo, useForget, useVerifyCode } from "@/service";
import { useNavigate } from "react-router";

interface ForgetProp {}

interface FormInfo extends ForgetInfo {}

const SECOUNDKEY = "_FORGET_SECOUND_KEY";

export const Forget: FC<ForgetProp> = () => {
  const [form] = Form.useForm<FormInfo>();
  const { messageApi } = useContext(AppContext);
  const [forgetInfo, setForgetInfo] = useState<Partial<FormInfo>>({});
  const [holdSecond, setHoldSecound] = useState(() =>
    Number(localStorage.getItem(SECOUNDKEY) || 0)
  );
  const navigate = useNavigate();
  const ForgetText = useConfig().useLanguage!<"Forget">("Forget");

  const rules: Record<string, Rule[]> = {
    email: [
      { required: true, message: ForgetText.emailEmpty },
      {
        pattern:
          /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
        message: ForgetText.emailInvalid,
      },
    ],
    verify: [
      { required: true, message: ForgetText.verifyCodeEmpty },
      { pattern: /^\d+$/, message: ForgetText.verifyCodeInvalid },
    ],
  };

  const {
    code: verificationCode,
    fetchData: postVerification,
    error: verificationError,
    loading: verificationLoading,
  } = useVerifyCode({ email: forgetInfo.email });
  useEffect(() => {
    if (verificationCode === 200) {
      messageApi?.success(ForgetText.verifySendFeedback);
      setHoldSecound(60);
    }
  }, [verificationCode, messageApi, ForgetText.verifySendFeedback]);

  useEffect(() => {
    if (verificationError) messageApi?.error(verificationError);
  }, [verificationError, messageApi]);

  const {
    code: forgetInfoCode,
    fetchData: postForgetData,
    loading: forgetInfoLoading,
    error: forgetInfoError,
  } = useForget(forgetInfo);

  useEffect(() => {
    if (forgetInfoCode === 200) {
      messageApi?.success(ForgetText.forgetSuccess);
      setHoldSecound(0);
      setTimeout(() => navigate("/login"), 5000);
    }
  }, [ForgetText.forgetSuccess, messageApi, navigate, forgetInfoCode]);

  useEffect(() => {
    if (forgetInfoError) messageApi?.error(forgetInfoError);
  }, [forgetInfoError, messageApi]);

  const handleVerify = () => {
    if (!forgetInfo.email) messageApi?.error(ForgetText.emailEmpty);
    else {
      const fieldErrors = form.getFieldsError(["email"]);
      if (fieldErrors.some((error) => error.errors.length > 0))
        messageApi?.error(ForgetText.emailInvalid);
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
    postForgetData?.();
  };

  return (
    <Card style={ForgetCardStyle}>
      <h1>{ForgetText.title}</h1>
      <Form
        form={form}
        onValuesChange={(_, newValue) => setForgetInfo(newValue)}
        autoComplete="off"
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          label={ForgetText.emailTitle}
          name="email"
          rules={rules.email}
        >
          <Input style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          label={ForgetText.verifyTitle}
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
                ? ForgetText.verifySending
                : !holdSecond
                ? ForgetText.verifySend
                : `${ForgetText.verifyResend} ${holdSecond}s`}
            </Button>
          </Flex>
        </Form.Item>
       
        <Flex gap={3}>
          <Button type="primary" htmlType="submit" loading={forgetInfoLoading}>
            {ForgetText.submitButton}
          </Button>
          <Button type="link" onClick={() => navigate("/login")}>
            {ForgetText.loginButton}
          </Button>
        </Flex>
      </Form>
    </Card>
  );
};
