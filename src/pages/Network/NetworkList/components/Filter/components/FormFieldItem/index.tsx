import { useLanguageContext } from "@/hooks";
import { Flex, Form, Select } from "antd";
import {
  CSSProperties,
  FC,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  CategoryOptions,
  categoryOptions,
  contentOptions,
  quantifierOptions,
} from "./selectOptions";
import { useGetUsers } from "@/service";
import { userAtom } from "@/store";
import { AppContext } from "@/App";
import { useAtomValue } from "jotai";

interface FormFieldItemProp {
  name: number;
  checkOptionDisable: (target: CategoryOptions) => boolean;
}

const fieldInputStyle: CSSProperties = {
  width: "calc(100% /3)",
};

export const FormFieldItem: FC<FormFieldItemProp> = ({
  name,
  checkOptionDisable,
}) => {
  const { messageApi } = useContext(AppContext);
  const { LanguageText } = useLanguageContext<"Network">();
  const [catagorySelect, setCatagorySelect] = useState<CategoryOptions>();

  const { userInfo } = useAtomValue(userAtom);
  const {
    fetchData: fetchUsersData,
    error: usersError,
    data: usersData,
    code: usersCode,
    loading: usersLoading,
  } = useGetUsers();
  useEffect(() => {
    fetchUsersData?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (usersError) messageApi?.error(usersError);
  }, [messageApi, usersError]);
  const creatorsOptions = useMemo(() => {
    if (usersCode === 200 && usersData?.data)
      return usersData.data.map(({ name, id }) => ({
        label: name === userInfo?.name ? LanguageText.meText : name,
        value: id,
      }));
    return [];
  }, [LanguageText.meText, userInfo?.name, usersCode, usersData?.data]);
  const quantifierOptionsMemo = useMemo(
    () =>
      quantifierOptions[catagorySelect || CategoryOptions.CREATOR].map(
        ({ labelKey, ...rest }) => ({
          label: LanguageText[labelKey],
          ...rest,
        })
      ),
    [LanguageText, catagorySelect]
  );

  return (
    <Flex align="center" gap={5} style={{ width: "60%" }}>
      <Form.Item name={[name, "category"]} noStyle>
        <Select
          style={fieldInputStyle}
          value={catagorySelect}
          onSelect={(newValue) => setCatagorySelect(newValue)}
          options={categoryOptions.map(({ labelKey, value, ...rest }) => ({
            label: LanguageText[labelKey],
            value,
            disabled: checkOptionDisable(value),
            ...rest,
          }))}
        />
      </Form.Item>
      <Form.Item
        name={[name, "quantifier"]}
        noStyle
        rules={[{ required: true, message: LanguageText.quantifierEmpty }]}
      >
        <Select
          disabled={!catagorySelect}
          style={fieldInputStyle}
          options={quantifierOptionsMemo}
        />
      </Form.Item>
      <Form.Item
        name={[name, "content"]}
        noStyle
        rules={[{ required: true, message: LanguageText.contentEmpty }]}
      >
        <Select
          mode="multiple"
          allowClear
          maxTagCount="responsive"
          disabled={
            !catagorySelect ||
            (catagorySelect === CategoryOptions.CREATOR && usersLoading)
          }
          style={fieldInputStyle}
          loading={catagorySelect === CategoryOptions.CREATOR && usersLoading}
          options={
            catagorySelect === CategoryOptions.CREATOR
              ? creatorsOptions
              : contentOptions[catagorySelect || CategoryOptions.STATUS].map(
                  ({ labelKey, value }) => ({
                    label: LanguageText[labelKey],
                    value,
                  })
                )
          }
        />
      </Form.Item>
      <div>{catagorySelect === CategoryOptions.CREATOR}</div>
    </Flex>
  );
};
