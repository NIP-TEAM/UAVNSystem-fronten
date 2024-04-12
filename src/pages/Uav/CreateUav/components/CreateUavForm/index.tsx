import { Form } from "antd";
import { FC } from "react";

export interface CreateUavFormProp {}

export const CreateUavForm: FC<CreateUavFormProp> = () => {
    const [form] = Form.useForm()
    return <Form form={form}>111</Form>
}