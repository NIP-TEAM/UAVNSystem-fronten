import { Card, Form } from "antd";
import { FC } from "react";
import { LoginCardStyle, LoginHeaderStyle } from "./style";
import { useConfig } from "../../hooks";
import LoginTextLanguage from '../../language/pages/Login.json'

export interface LoginProp {}

export const Login: FC<LoginProp> = () => {
  const { useLanguage } = useConfig();
  const LoginText = useLanguage?.(LoginTextLanguage) || {}
  const form = Form.useForm();
  return (
    <Card style={LoginCardStyle}>
      <h1 style={LoginHeaderStyle}>{LoginText.title}</h1>
      <div>222</div>
      <div>333</div>
    </Card>
  );
};
