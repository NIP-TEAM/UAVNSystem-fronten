import { useLanguageContext } from "@/hooks";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Flex, Form, Input, Select, Typography } from "antd";
import { FC, useState } from "react";
import { NetworkAboutRender, UavAboutRender } from "./components";

export interface ConditionOptionsProp {
  fieldName: number[];
}

export enum ConditionType {
  NETWORK,
  UAV,
}

export const ConditionOptions: FC<ConditionOptionsProp> = ({ fieldName }) => {
  const { LanguageText } = useLanguageContext<"CreateEmail">();

  const [conditionType, setConditionType] = useState<ConditionType>();

  //   condition type
  const ConditionOptions: { label: string; value: ConditionType }[] = [
    {
      label: LanguageText.networkOptionTypeLabel,
      value: ConditionType.NETWORK,
    },
    { label: LanguageText.uavOptionTypeLabel, value: ConditionType.UAV },
  ];

  return (
    <>
      <Flex align="baseline" justify="space-between">
        <Typography.Title level={5}>
          {LanguageText.conditionTitle}
        </Typography.Title>
        <Button danger type="link" icon={<DeleteOutlined />} />
      </Flex>
      <Form.Item
        name={[...fieldName, "conditionType"]}
        label={LanguageText.conditionTypeLabel}
        rules={[
          { required: true, message: LanguageText.conditionTypeRequired },
        ]}
        style={{ width: "30%" }}
      >
        <Select
          options={ConditionOptions}
          onChange={(e) => setConditionType(e)}
        />
      </Form.Item>
      {(() => {
        switch (conditionType) {
          case ConditionType.NETWORK:
            return <NetworkAboutRender name={[...fieldName, "condition"]} />;
          case ConditionType.UAV:
            return <UavAboutRender />;
          default:
            return (
              <div>
                <Input disabled style={{ width: "30%" }} />
              </div>
            );
        }
      })()}
    </>
  );
};
