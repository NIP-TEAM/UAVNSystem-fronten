import { useLanguageContext } from "@/hooks";
import { Col, Form, Input, Row, Select, SelectProps } from "antd";
import { SetStateAction } from "jotai";
import { Dispatch, FC, useContext, useEffect, useMemo } from "react";
import { useGetUsers } from "@/service";
import { AppContext } from "@/App";
import { debounce } from "lodash-es";

type FormType = {
  creatorIds: number[];
  searchKey: string;
};

export interface FilterProp {
  initParams?: FormType;
  setDataController: Dispatch<SetStateAction<FormType>>;
  setTimestamp: Dispatch<SetStateAction<number>>;
}

export const Filter: FC<FilterProp> = ({
  setDataController,
  setTimestamp,
  initParams,
}) => {
  const { messageApi } = useContext(AppContext);
  const { LanguageText } = useLanguageContext<"Contact">();
  // creatorData
  const {
    fetchData: fetchUser,
    error: userError,
    code: userCode,
    loading: userLoading,
    data: userDataData,
  } = useGetUsers();
  useEffect(() => {
    if (userError) messageApi?.error(userError);
  }, [messageApi, userError]);
  useEffect(() => {
    fetchUser?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const userData = useMemo<SelectProps["options"]>(() => {
    if (userCode === 200 && userDataData?.data)
      return userDataData.data.map(({ name, id }) => ({
        label: name,
        value: id,
      }));
    return [];
  }, [userDataData?.data, userCode]);

  const [form] = Form.useForm<FormType>();
  useEffect(() => {
    if (initParams) form.setFieldsValue(initParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Form
      form={form}
      onValuesChange={debounce((newValue) => {
        setDataController((prev) => ({
          ...prev,
          ...newValue,
        }));
        setTimestamp(new Date().getTime());
      }, 600)}
    >
      <Row gutter={8}>
        <Col span={8}>
          <Form.Item<FormType>
            name="creatorIds"
            label={LanguageText.creatorLabel}
          >
            <Select
              allowClear
              mode="multiple"
              loading={userLoading}
              options={userData}
              maxTagCount="responsive"
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item<FormType>
            name="searchKey"
            label={LanguageText.searchLabel}
          >
            <Input.Search allowClear />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};
