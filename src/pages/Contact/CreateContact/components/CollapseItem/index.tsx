import { useLanguageContext } from "@/hooks";
import { ContactDataType } from "@/service";
import { Flex, Form, Input } from "antd";
import { FC } from "react";

export interface CollapseItemProp {
  restField: { [key: string]: unknown };
  parentFieldName: number;
}

export const CollapseItem: FC<CollapseItemProp> = ({
  restField,
  parentFieldName,
}) => {
  const { LanguageText } = useLanguageContext<"CreateContact">();

  return (
    <>
      <Flex align="center" gap="large">
        <Form.Item<ContactDataType["email"]>
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
        <Form.Item<ContactDataType["phone"]>
          label={LanguageText.phoneLabel}
          name={[parentFieldName, "phone"]}
          rules={[{ pattern: /^\d{11}$/, message: LanguageText.phoneInvalid }]}
          {...restField}
        >
          <Input
            count={{
              show: true,
              max: 11,
            }}
          />
        </Form.Item>
      </Flex>
      <Form.Item<ContactDataType["note"]>
        style={{ padding: "0.5em" }}
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
