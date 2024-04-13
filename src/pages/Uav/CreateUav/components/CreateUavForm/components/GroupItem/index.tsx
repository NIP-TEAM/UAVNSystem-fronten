import { useLanguageContext } from "@/hooks";
import { Button, Card, Flex, Form, Select } from "antd";
import { DefaultOptionType } from "antd/es/select";
import { FC } from "react";
import { UavItem } from "./components";
import { PlusOutlined } from "@ant-design/icons";

export interface GroupItemProp {
  groupKey: number;
  groupName: number;
  restGroupFeild: { [key: string]: unknown };
  networkOptions: DefaultOptionType[];
  networkLoading: boolean;
}

export const GroupItem: FC<GroupItemProp> = ({
  groupKey,
  groupName,
  restGroupFeild,
  networkOptions,
  networkLoading,
}) => {
  const { LanguageText } = useLanguageContext<"Uav">();

  return (
    <>
      <Card style={{ marginTop: 5 }}>
        <Form.Item
          label={LanguageText.groupLabel}
          name={[groupName, "networkId"]}
          rules={[{ required: true, message: LanguageText.groupEmpty }]}
          {...restGroupFeild}
        >
          <Select
            style={{ width: "40%" }}
            loading={networkLoading}
            options={networkOptions}
            allowClear
            showSearch
            filterOption={(input, option) =>
              ((option?.label ?? "") as string)
                .toLowerCase()
                .includes(input.toLowerCase())
            }
          />
        </Form.Item>

        <Form.List
          name={[groupName, "uavs"]}
          key={groupKey}
          {...restGroupFeild}
        >
          {(uavFields, { add: addUav, remove: removeUav }) => (
            <>
              <Flex gap={5} wrap="wrap">
                {uavFields.map(
                  (
                    { key: uavKey, name: uavName, ...restUavField },
                    uavIndex
                  ) => (
                    <div key={uavKey} style={{ width: "45%" }}>
                      <UavItem
                        {...{
                          uavKey,
                          uavName,
                          restUavField,
                          removeUav,
                          uavIndex,
                        }}
                      />
                    </div>
                  )
                )}
              </Flex>
              <Button onClick={addUav} type="link" icon={<PlusOutlined />}>
                {LanguageText.addUav}
              </Button>
            </>
          )}
        </Form.List>
      </Card>
    </>
  );
};
