import { BasicCard } from "@/components";
import { useLanguageContext } from "@/hooks";
import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Collapse,
  Flex,
  Form,
  FormProps,
  SelectProps,
  Typography,
} from "antd";
import { FC, useContext, useEffect, useMemo, useState } from "react";
import { CollapseHeader, CollapseItem } from "./components";
import { ContactDataType, useGetContactList } from "@/service";
import { AppContext } from "@/App";

export type FormType = {
  contacts: Partial<ContactDataType>[];
};

export interface CreateContactProp {}

export const CreateContact: FC<CreateContactProp> = () => {
  const { messageApi } = useContext(AppContext);
  const { LanguageText } = useLanguageContext<"CreateContact">();

  const {
    fetchData: fetchContactList,
    code: contactListCode,
    data: contactListDataData,
    error: contactListError,
    loading: contactLoading,
  } = useGetContactList();
  const [timestamp, setTimestamp] = useState(0);
  useEffect(() => {
    if (contactListError) messageApi?.error(contactListError);
  }, [contactListError, messageApi]);
  useEffect(() => {
    fetchContactList?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    fetchContactList?.();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timestamp]);
  const contactListOptions = useMemo<SelectProps["options"]>(() => {
    if (contactListCode === 200 && contactListDataData?.data)
      return contactListDataData.data.map(({ id, name }) => ({
        label: name,
        value: id,
      }));
    return [];
  }, [contactListCode, contactListDataData?.data]);

  const [form] = Form.useForm<FormType>();
  const contactsInfo = Form.useWatch("contacts", form);
  const [activeKeys, setActiveKeys] = useState<string[]>(["0"]);

  const onSubmit = () => {
    console.log(contactsInfo);
  };

  const onFinishFailed: FormProps["onFinishFailed"] = (errorInfo) => {
    const { errorFields } = errorInfo;
    setActiveKeys(errorFields?.map((item) => item?.name?.[1].toString()) || []);
  };

  return (
    <BasicCard>
      <Typography.Title level={4}>{LanguageText.createTitle}</Typography.Title>
      <Form form={form} onFinish={onSubmit} onFinishFailed={onFinishFailed}>
        <Form.List name="contacts">
          {(fields, { add, remove }) => (
            <>
              <Collapse
                bordered={false}
                activeKey={activeKeys}
                onChange={(e) => {
                  setActiveKeys(e as string[]);
                }}
                items={fields.map(
                  // eslint-disable-next-line @typescript-eslint/no-unused-vars
                  ({ key, name: parentFieldName, ...restField }) => ({
                    key: parentFieldName,
                    label: (
                      <CollapseHeader
                        {...{
                          headerTitle:
                            contactsInfo?.[parentFieldName]?.name || "error",
                          restField,
                          parentFieldName,
                        }}
                        removeItem={() => {
                          setActiveKeys((prev) => [
                            ...prev.filter(
                              (item) => item !== parentFieldName.toString()
                            ),
                          ]);
                          remove(parentFieldName);
                        }}
                      />
                    ),
                    children: (
                      <CollapseItem
                        {...{
                          parentFieldName,
                          restField,
                          contactListOptions,
                          contactLoading,
                          setTimestamp,
                        }}
                      />
                    ),
                  })
                )}
              />
              <Button
                type="link"
                icon={<PlusOutlined />}
                onClick={() => {
                  const activeValue = (
                    fields?.length > 0
                      ? fields[fields.length - 1]?.name + 1
                      : fields[0]?.name || 0
                  ).toString();
                  const titleValue = (
                    fields?.length > 0
                      ? fields[fields.length - 1]?.key + 2
                      : fields[0]?.key || 1
                  ).toString();
                  add({
                    name: "New contact " + titleValue,
                  });
                  setActiveKeys([activeValue]);
                }}
              >
                {LanguageText.addContact}
              </Button>
            </>
          )}
        </Form.List>
        <Form.Item>
          <Flex gap="small" justify="end">
            <Button
              type="primary"
              htmlType="submit"
              disabled={!contactsInfo?.length}
            >
              {LanguageText.addButton}
            </Button>
          </Flex>
        </Form.Item>
      </Form>
    </BasicCard>
  );
};
