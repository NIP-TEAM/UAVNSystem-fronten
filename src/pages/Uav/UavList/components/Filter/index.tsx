import { useLanguageContext } from "@/hooks";
import { Flex, Form, Input, Typography } from "antd";
import { Dispatch, FC, SetStateAction, useEffect } from "react";
import { FilterType } from "../../types";

export interface FilterProp {
  initParams?: FilterType;
  setFilter: Dispatch<SetStateAction<FilterType>>;
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
    setTimestamp,
    setFilter,
    initParams,
}) => {
  const { LanguageText } = useLanguageContext<"Uav">();
  const [form] = Form.useForm<FormItemProtocol>();
  const formFilters = Form.useWatch("filters", form);

  useEffect(() => {
    setFilter((prev) => {
      const requestFilters: {
        [key: string]: { quantifier: string; content: string | number };
      } = {};
      formFilters
        ?.filter((item) => !!item)
        .forEach(({ category, quantifier, content }) => {
          if (!category || !quantifier || !content) return;
          requestFilters[category] = {
            quantifier,
            content,
          };
        });
      return {
        ...prev,
        filters: requestFilters,
      };
    });
  }, [formFilters, setFilter]);

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

  const handleOk = () => {
    setTimestamp(new Date().getTime());
  };

  return (
    <Form form={form}>
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
    </Form>
  );
};
