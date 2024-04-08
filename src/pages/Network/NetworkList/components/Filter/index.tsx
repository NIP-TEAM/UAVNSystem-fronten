import { useLanguageContext } from "@/hooks";
import { Form, Typography } from "antd";
import { Dispatch, FC, SetStateAction } from "react";

export interface FilterProp {
  initParams?: string;
  setFilter: Dispatch<SetStateAction<string>>
}

export const Filter: FC<FilterProp> = ({
    setFilter,
}) => {
  const {LanguageText} = useLanguageContext<"Network">()
  const [form] = Form.useForm();
  return (
    <Form form={form}>
      <Typography.Title level={5}>{LanguageText.filterTitle}</Typography.Title>
      
    </Form>
  );
};
