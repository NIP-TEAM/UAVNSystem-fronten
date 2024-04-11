import { useLanguageContext } from "@/hooks";
import { Form, Typography } from "antd";
import { FC } from "react";

export interface FilterProp {
    initParams?: string
}

export const Filter: FC<FilterProp> = () => {
    const { LanguageText } = useLanguageContext<"Uav">()
    const [form] = Form.useForm()
    return <Form form={form}>
        <Typography.Title level={5}>{ LanguageText.filterTitle }</Typography.Title>
    </Form>
}