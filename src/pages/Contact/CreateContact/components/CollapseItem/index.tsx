import { AppContext } from "@/App";
import { useLanguageContext } from "@/hooks";
import { ContactDataType, useCreateContactList } from "@/service";
import {
  DownOutlined,
  LoadingOutlined,
  PlusOutlined,
  QuestionCircleFilled,
} from "@ant-design/icons";
import {
  Flex,
  Form,
  Input,
  Select,
  SelectProps,
  Tooltip,
  Typography,
} from "antd";
import { SetStateAction } from "jotai";
import { Dispatch, FC, useContext, useEffect, useMemo, useState } from "react";

export interface CollapseItemProp {
  restField: { [key: string]: unknown };
  parentFieldName: number;
  contactListOptions: SelectProps["options"];
  contactLoading: boolean;
  setTimestamp: Dispatch<SetStateAction<number>>;
}

export const CollapseItem: FC<CollapseItemProp> = ({
  restField,
  parentFieldName,
  contactListOptions,
  contactLoading,
  setTimestamp,
}) => {
  const { messageApi } = useContext(AppContext);
  const { LanguageText } = useLanguageContext<"CreateContact">();

  // add contact list about
  const [contactListName, setContactListName] = useState("");
  const handleFilterOption: SelectProps["filterOption"] = (input, option) =>
    ((option?.label || "") as string)
      .toLowerCase()
      .includes(input.toLowerCase());
  const handleSearch: SelectProps["onSearch"] = (searchInput) => {
    if (
      contactListOptions?.some((optionItem) =>
        handleFilterOption(searchInput, optionItem)
      )
    )
      setContactListName("");
    else setContactListName(searchInput);
  };
  const {
    fetchData: fetchCreate,
    error: createError,
    code: createCode,
    loading: createLoading,
  } = useCreateContactList({
    name: contactListName,
  });
  const AddContactList = useMemo(
    () => (
      <Typography.Link
        onClick={() => fetchCreate?.()}
        title={LanguageText.addContactListTip}
      >
        {createLoading ? <LoadingOutlined /> : <PlusOutlined />}
      </Typography.Link>
    ),
    [LanguageText.addContactListTip, createLoading, fetchCreate]
  );
  useEffect(() => {
    if (createError) messageApi?.error(createError);
  }, [createError, messageApi]);
  useEffect(() => {
    if (createCode === 200) {
      setTimestamp(new Date().getTime());
      messageApi?.success(LanguageText.addContactListSuccess);
      setContactListName("");
    }
  }, [
    LanguageText.addContactListSuccess,
    createCode,
    messageApi,
    setTimestamp,
  ]);

  return (
    <>
      <Form.Item<ContactDataType["email"]>
        style={{ width: "50%" }}
        label={LanguageText.emailLabel}
        name={[parentFieldName, "email"]}
        {...restField}
        required
        rules={[
          { required: true, message: LanguageText.emailEmpty },
          {
            pattern:
              /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
            message: LanguageText.emailInvalid,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Flex align="center" gap="large" style={{ padding: 0 }}>
        <Form.Item<ContactDataType["phone"]>
          label={LanguageText.phoneLabel}
          name={[parentFieldName, "phone"]}
          rules={[{ pattern: /^\d{11}$/, message: LanguageText.phoneInvalid }]}
          {...restField}
        >
          <Flex gap="small">
            <Input
              count={{
                show: true,
                max: 11,
              }}
            />
            <Tooltip title={LanguageText.phoneTip}>
              <QuestionCircleFilled />
            </Tooltip>
          </Flex>
        </Form.Item>
        <Form.Item<ContactDataType["contactListIds"]>
          style={{ width: "40%" }}
          label={LanguageText.listLabel}
          name={[parentFieldName, "contactListIds"]}
          {...restField}
        >
          <Select
            options={contactListOptions}
            placeholder={LanguageText.selectPlaceholder}
            loading={contactLoading}
            mode="multiple"
            maxTagCount="responsive"
            allowClear={!contactListName}
            suffixIcon={contactListName ? AddContactList : <DownOutlined />}
            onSearch={handleSearch}
            onBlur={() => setContactListName("")}
            filterOption={handleFilterOption}
          />
        </Form.Item>
      </Flex>
      <Form.Item<ContactDataType["note"]>
        label={LanguageText.noteLabel}
        name={[parentFieldName, "note"]}
        rules={[{ max: 150, message: LanguageText.noteInvalid }]}
      >
        <Input.TextArea
          count={{
            show: true,
            max: 150,
          }}
          autoSize
        />
      </Form.Item>
    </>
  );
};
