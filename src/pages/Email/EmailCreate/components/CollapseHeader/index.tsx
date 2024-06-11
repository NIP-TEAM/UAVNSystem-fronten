import { EmailDataType } from "@/service";
import { CheckOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Flex, Form, Input } from "antd";
import { FC, useState } from "react";
import { DeleteModal } from "./components";

export interface CollapseHeaderProp {
  parentFieldName: number;
  headerTitle: string;
  restField: { [key: string]: unknown };
  removeItem: () => void;
}

export const CollapseHeader: FC<CollapseHeaderProp> = ({
  restField,
  headerTitle,
  parentFieldName,
  removeItem,
}) => {
  const [inputState, setInputState] = useState(false);

  return (
    <Flex align="top" justify="space-between">
      <Flex align="center" gap="small">
        {inputState ? (
          <Form.Item<EmailDataType["name"]>
            name={[parentFieldName, "name"]}
            {...restField}
            noStyle
          >
            <Input onClick={(e) => e.stopPropagation()} />
          </Form.Item>
        ) : (
          headerTitle
        )}
        <Button
          size="small"
          icon={inputState ? <CheckOutlined /> : <EditOutlined />}
          type="link"
          onClick={(e) => {
            e.stopPropagation();
            setInputState((prev) => !prev);
          }}
        />
      </Flex>
      <DeleteModal {...{removeItem}} />
    </Flex>
  );
};
