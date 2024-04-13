import { useLanguageContext } from "@/hooks";
import { Card, Form, Input } from "antd";
import { FC } from "react";
import { DeleteModal } from "./components";

export interface UavItemProp {
  uavKey: number;
  uavName: number;
  restUavField: { [key: string]: unknown };
  uavIndex: number;
  removeUav: (index: number | number[]) => void;
}

export const UavItem: FC<UavItemProp> = ({
  uavKey,
  uavName,
  restUavField,
  removeUav,
  uavIndex,
}) => {
  const { LanguageText } = useLanguageContext<"Uav">();
  return (
    <Card
      hoverable
      title={`${LanguageText.uavTitle} ${uavKey}`}
      extra={<DeleteModal confirmHandle={() => removeUav(uavIndex)} />}
    >
      <Form.Item
        name={[uavName, "name"]}
        label={LanguageText.nameLabel}
        {...restUavField}
      >
        <Input />
      </Form.Item>
    </Card>
  );
};
