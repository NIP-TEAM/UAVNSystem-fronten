import { useLanguageContext } from "@/hooks";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Flex, Form, Input, Typography } from "antd";
import { Dispatch, FC, SetStateAction, useEffect } from "react";
import { FormFieldItem } from "./components";

export interface FilterProp {
  initParams?: string;
  setFilter: Dispatch<SetStateAction<string>>;
}

interface FormListProtocol {
  status: number[];
  creatorId: string;
}

interface FormItemProtocol {
  searchKey: string;
  filters: FormListProtocol;
}

export const Filter: FC<FilterProp> = ({ setFilter }) => {
  const { LanguageText } = useLanguageContext<"Network">();
  const [form] = Form.useForm<FormItemProtocol>();
  const formFilters = Form.useWatch("filters", form);

  useEffect(() => {
    console.log(formFilters);
  }, [formFilters]);

  return (
    <Form form={form}>
      <Flex align="baseline" justify="space-between">
        <Typography.Title level={5}>
          {LanguageText.filterTitle}
        </Typography.Title>
        <Form.Item<FormItemProtocol> noStyle name="searchKey">
          <Input.Search style={{width: "30%"}}/>
        </Form.Item>
      </Flex>
      <Form.List name="filters">
        {(fields, { add, remove }) => (
          <>
            {fields.map((field, index) => (
              <Form.Item {...field}>
                <Flex gap={5} align="center">
                  <FormFieldItem />
                  <Typography.Text type="danger" onClick={() => remove(index)}>
                    <DeleteOutlined />
                  </Typography.Text>
                </Flex>
              </Form.Item>
            ))}
            <Form.Item>
              <Button type="link" icon={<PlusOutlined />} onClick={() => add()}>
                {LanguageText.addField}
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </Form>
  );
};
