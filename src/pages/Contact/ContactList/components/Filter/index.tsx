import { useLanguageContext } from "@/hooks";
import { Button, Flex, Form, Input, Typography } from "antd";
import { FC, useEffect } from "react";
import { useContactGlobalContext } from "../../hooks";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import {
  CategoryOptions,
  categoryOptions,
} from "./components/FormFieldItem/selectOptions";
import { FormFieldItem } from "./components";
import { FilterType } from "./types";

export interface FilterProp {
  initParams?: FormItemProtocol;
}

type FormListProtocol = {
  category: string;
  quantifier: string;
  content: string | number;
}[];

interface FormItemProtocol {
  searchKey: string;
  filters: FormListProtocol;
}

export const Filter: FC<FilterProp> = ({ initParams }) => {
  const { LanguageText } = useLanguageContext<"Contact">();
  const { setFilters, setSearchKey, setRefreshContactFlag } =
    useContactGlobalContext();

  const [form] = Form.useForm<FormItemProtocol>();
  useEffect(() => {
    if (initParams) form.setFieldsValue(initParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formFilters = Form.useWatch("filters", form);
  useEffect(
    () =>
      setFilters(
        formFilters?.reduce((acc, current) => {
          if (!current) return acc;
          const { category, quantifier, content } = current;
          if (category && quantifier && content)
            acc[category] = { quantifier, content };
          return acc;
        }, {} as FilterType["filters"])
      ),
    [setFilters, formFilters]
  );

  const checkOptionDisable = (target: CategoryOptions) =>
    !!formFilters?.find((item) => item?.category === target);

  const onFinish = () => {
    setRefreshContactFlag(new Date().getTime());
  };

  return (
    <Form form={form} onFinish={onFinish}>
      <Flex align="baseline" justify="space-between">
        <Typography.Title level={5}>
          {LanguageText.filterTitle}
        </Typography.Title>
        <Form.Item<FormItemProtocol> noStyle name="searchKey">
          <Input.Search
            style={{ width: "30%" }}
            allowClear
            onSearch={onFinish}
            onChange={(e) => setSearchKey(e.target.value)}
          />
        </Form.Item>
      </Flex>
      <Form.List name="filters">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restfeild }, index) => (
              <Form.Item key={key} {...restfeild}>
                <Flex gap={5} align="center">
                  <FormFieldItem
                    name={name}
                    checkOptionDisable={checkOptionDisable}
                  />
                  <Button
                    type="link"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => remove(index)}
                  />
                </Flex>
              </Form.Item>
            ))}
            <Form.Item noStyle>
              <Button
                type="link"
                icon={<PlusOutlined />}
                onClick={() => add()}
                disabled={formFilters?.length === categoryOptions.length}
              >
                {LanguageText.addField}
              </Button>
            </Form.Item>
            <Form.Item>
              <Flex align="center" justify="end">
                <Flex align="center" gap={5}>
                  <Button
                    onClick={() => {
                      form.resetFields();
                      setTimeout(() => {
                        setRefreshContactFlag(new Date().getTime());
                      }, 0);
                    }}
                  >
                    {LanguageText.clearFilter}
                  </Button>
                  <Button type="primary" htmlType="submit">
                    {LanguageText.applyFilter}
                  </Button>
                </Flex>
              </Flex>
            </Form.Item>
          </>
        )}
      </Form.List>
    </Form>
  );
};
