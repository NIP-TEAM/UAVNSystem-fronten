import { BasicCard } from "@/components";
import { useLanguageContext } from "@/hooks";
import { Form, Typography } from "antd";
import { FC } from "react";

export interface CreateContactProp {}

export const CreateContact: FC<CreateContactProp> = () => {
  const { LanguageText } = useLanguageContext<"Contact">();
  const [form] = Form.useForm();
  return (
    <BasicCard>
      <Typography.Title level={5}>{LanguageText.createTitle}</Typography.Title>
      <Form form={form}>Form</Form>
    </BasicCard>
  );
};
