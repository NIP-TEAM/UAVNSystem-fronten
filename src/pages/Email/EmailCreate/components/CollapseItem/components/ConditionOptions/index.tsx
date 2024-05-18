import { useLanguageContext } from "@/hooks";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Flex, Form, Select, Typography } from "antd";
import { FC, useState } from "react";
import { NetworkAboutRender, UavAboutRender } from "./components";

export interface ConditionOptionsProp {
  fieldName: number[];
  remove: (target: number) => void;
}

enum ConditionType {
  NETWORK,
  UAV,
}

export const ConditionOptions: FC<ConditionOptionsProp> = ({
  fieldName,
  remove,
}) => {
  const { LanguageText } = useLanguageContext<"CreateEmail">();

  const [conditionType, setConditionType] = useState<ConditionType>(
    ConditionType.NETWORK
  );

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
          {LanguageText.conditionTitle + " " + (fieldName[1] + 1)}
        </Typography.Title>
        <Button
          danger
          type="link"
          icon={<DeleteOutlined />}
          onClick={() => remove(fieldName[1])}
        />
      </Flex>
      <Form.Item
        name={[...fieldName, "conditiontype"]}
        label={LanguageText.conditionTypeLabel}
        rules={[
          { required: true, message: LanguageText.conditionTypeRequired },
        ]}
        style={{ width: "30%" }}
        initialValue={ConditionType.NETWORK}
      >
        <Select
          options={ConditionOptions}
          onChange={(e) => setConditionType(e)}
        />
      </Form.Item>
      {(() => {
        switch (conditionType) {
          case ConditionType.NETWORK:
            return <NetworkAboutRender name={[...fieldName, "conditions"]} />;
          case ConditionType.UAV:
            return <UavAboutRender />;
          default:
            return <NetworkAboutRender name={[...fieldName, "conditions"]} />;
        }
      })()}
    </>
  );
};
