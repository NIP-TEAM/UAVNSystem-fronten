import { useLanguageContext } from "@/hooks";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Flex, Form, Input, Select, SelectProps, Typography } from "antd";
import { SetStateAction } from "jotai";
import { Dispatch, FC, useContext, useEffect, useMemo } from "react";
import {
  ContactListDataControllerType,
  UserDataType,
  useGetUsers,
} from "@/service";
import { AppContext } from "@/App";

type FormType = ContactListDataControllerType;

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
  }, [userError, messageApi]);
  useEffect(() => {
    fetchUser?.();
  }, [fetchUser]);
  const userData = useMemo<SelectProps["options"]>(() => {
    if (userCode === 200 && userDataData?.data) return userDataData.data;
    return [];
  }, [userDataData?.data, userCode]);

  const [form] = Form.useForm<FormType>();

  return (
    <div>
      {LanguageText.filterTitle}
      <Form form={form}>
        <Form.Item<FormType> name="creatorId">
          <Select allowClear loading={userLoading} options={[]} />
        </Form.Item>
      </Form>
    </div>
  );
};
