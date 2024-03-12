import { Card , Form, Input} from "antd";
import { FC, useState } from "react";
import { useConfig } from "../../hooks";
import RegisterJson from "../../language/pages/Register.json"
import { RegisterCardStyle } from "./style";
import { UserOutlined } from "@ant-design/icons";

interface RegisterProp {}

interface FormInfo {
    email: string,
    password: string,
    rePassword: string,
    verify: number,
    avatar: string,
    name: string
}

export const Register: FC<RegisterProp> = () => {
    const {useLanguage} = useConfig();
    const [form] = Form.useForm<FormInfo>()
    const [registerInfo, setRegisterInfo] = useState<Partial<FormInfo>>({})
    const RegisterText = useLanguage?.(RegisterJson) || {}
    return <Card style={RegisterCardStyle}>
        <h1>{RegisterText.title}</h1>
        <Form form={form} onValuesChange={(_, newValue) => setRegisterInfo(newValue)} autoComplete="off">
        <Form.Item name="email" rules={rules.email}>
          <Input prefix={<UserOutlined />} placeholder={LoginText.emailInput} />
        </Form.Item>
        </Form>
    </Card>
}