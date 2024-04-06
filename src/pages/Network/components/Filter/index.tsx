import { Form, Typography } from "antd";
import { Dispatch, FC, SetStateAction } from "react";

export interface FilterProp {
  initParams?: string;
  NetworkText: Record<string, string>;
  setFilter: Dispatch<SetStateAction<string>>
}

export const Filter: FC<FilterProp> = ({
    NetworkText,
    setFilter,
}) => {
  const [form] = Form.useForm();
  return (
    <Form form={form}>
      <Typography.Title level={5}>{NetworkText['filterTitle']}</Typography.Title>
      
    </Form>
  );
};
