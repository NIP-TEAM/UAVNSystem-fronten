import { useLanguageContext } from "@/hooks";
import { ContactDataType } from "@/service";
import { QuestionCircleFilled } from "@ant-design/icons";
import { Flex, Form, Input, Select, SelectProps, Tooltip } from "antd";
import { SetStateAction } from "jotai";
import { Dispatch, FC } from "react";

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
  const { LanguageText } = useLanguageContext<"CreateContact">();

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
            mode="multiple"
            maxTagCount="responsive"
            allowClear
            showSearch
            filterOption={(input, option) =>
              ((option?.label ?? "") as string)
                .toLowerCase()
                .includes(input.toLowerCase())
            }
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
