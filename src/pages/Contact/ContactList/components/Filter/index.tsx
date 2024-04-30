import { useLanguageContext } from "@/hooks";
import { Form, SelectProps } from "antd";
import { SetStateAction } from "jotai";
import { Dispatch, FC, useContext, useEffect, useMemo } from "react";
import { useGetUsers } from "@/service";
import { AppContext } from "@/App";
import { FilterFormType } from "../types";

export interface FilterProp {
  initParams?: FilterFormType;
  setFilter: Dispatch<SetStateAction<string>>;
  setTimestamp: Dispatch<SetStateAction<number>>;
}

export const Filter: FC<FilterProp> = ({
  setFilter,
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

  const [form] = Form.useForm<FilterFormType>();
  useEffect(() => {
    if (initParams) form.setFieldsValue(initParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Form
      form={form}
    >
      111
    </Form>
  );
};
