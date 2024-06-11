import { useLanguageContext } from "@/hooks";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Flex, Form, Input, Typography } from "antd";
import { Dispatch, FC, SetStateAction, useEffect } from "react";
import { FormFieldItem } from "./components";
import {
  CategoryOptions,
  categoryOptions,
} from "./components/FormFieldItem/selectOptions";
import { BasicFilterType } from "@/types";

export interface FilterProp {
  initParams?: BasicFilterType;
  setFilter: Dispatch<SetStateAction<BasicFilterType>>;
  setTimestamp: Dispatch<SetStateAction<number>>;
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

export const Filter: FC<FilterProp> = ({
  setFilter,
  setTimestamp,
  initParams,
}) => {
  const { LanguageText } = useLanguageContext<"NetworkProtocol">();
  const [form] = Form.useForm<FormItemProtocol>();
  const formFilters = Form.useWatch("filters", form);

  const checkOptionDisable = (target: CategoryOptions) =>
    !!formFilters?.find((item) => item?.category === target);

  useEffect(() => {
    setFilter((prev) => {
      return {
        ...prev,
        filters: formFilters?.reduce((acc, current) => {
          if (!current) return acc;
          const { category, quantifier, content } = current;
          if (category && quantifier && content)
            acc[category] = { quantifier, content };
          return acc;
        }, {} as BasicFilterType["filters"]),
      };
    });
  }, [formFilters, setFilter]);

  const handleOk = () => {
    setTimestamp(new Date().getTime());
  };

  useEffect(() => {
    const { searchKey, filters } = initParams || {};
    form.setFieldsValue({
      searchKey,
      filters: Object.entries(filters || {}).map(
        ([key, { quantifier, content = "" }]) => ({
          category: key,
          quantifier: quantifier as string,
          content,
        })
      ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Form form={form} onFinish={handleOk}>
      <Flex align="baseline" justify="space-between">
        <Typography.Title level={5}>
          {LanguageText.filterTitle}
        </Typography.Title>
        <Form.Item<FormItemProtocol> noStyle name="searchKey">
          <Input.Search
            style={{ width: "30%" }}
            allowClear
            onSearch={handleOk}
            onChange={(e) =>
              setFilter((prev) => ({
                ...prev,
                searchKey: e.target.value,
              }))
            }
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
                      setTimeout(() => setTimestamp(new Date().getTime()));
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
