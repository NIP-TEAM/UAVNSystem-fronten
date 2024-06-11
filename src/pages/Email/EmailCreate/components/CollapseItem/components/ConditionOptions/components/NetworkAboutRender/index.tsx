import { useLanguageContext } from "@/hooks";
import {
  Flex,
  Form,
  Input,
  InputNumber,
  Select,
  SelectProps,
  Typography,
} from "antd";
import { FC, useState } from "react";

export interface NetworkAboutRenderProp {
  name: (string | number)[];
}

export const NetworkAboutRender: FC<NetworkAboutRenderProp> = ({ name }) => {
  const { LanguageText } = useLanguageContext<"CreateEmail">();
  const CategoryOptions: SelectProps["options"] = [
    { label: LanguageText.uavDisconnetedLabel, value: 1 },
  ];
  const QuantifierOptions: Record<number, SelectProps["options"]> = {
    1: [
      { label: "<", value: 1 },
      { label: "=", value: 2 },
      { label: ">", value: 3 },
    ],
  };

  const [category, setCategory] = useState(0);

  return (
    <Flex gap="small" align="baseline">
      <Typography.Text strong>{LanguageText.conditionPrefix}</Typography.Text>
      <Form.Item name={[...name, "category"]} rules={[{required: true, message: LanguageText.categoryEmpty}]} style={{ width: "20%" }}>
        <Select options={CategoryOptions} onChange={(e) => setCategory(e)} />
      </Form.Item>
      <Form.Item name={[...name, "quantifier"]} rules={[{required: true, message: LanguageText.quantifierEmpty}]} style={{ width: "20%" }}>
        <Select options={QuantifierOptions[category]} />
      </Form.Item>
      <Form.Item name={[...name, "content"]} rules={[{required: true, message: LanguageText.contentEmpty}]} style={{ width: "20%" }}>
        {(() => {
          switch (category) {
            case 1:
              return <InputNumber min={0} />;

            default:
              return <Input disabled />;
          }
        })()}
      </Form.Item>
    </Flex>
  );
};
