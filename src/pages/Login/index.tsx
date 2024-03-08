import { Form, Pagination } from "antd";
import { FC } from "react";

export interface LoginProp {}

export const Login: FC<LoginProp> = () => {
    const form = Form.useForm()
    return (
        <Pagination defaultCurrent={1} total={50} showSizeChanger />
    )
}