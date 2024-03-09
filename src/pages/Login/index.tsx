import { Card, Form } from "antd";
import { FC } from "react";
import { LoginCardStyle } from "./style";

export interface LoginProp {}

export const Login: FC<LoginProp> = () => {
  const form = Form.useForm();
  return (
    <Card style={LoginCardStyle}>
      <div>222</div>
      <div>333</div>
    </Card>
  );
};
