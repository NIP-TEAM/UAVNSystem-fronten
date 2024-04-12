import { Button, Form, Input } from "antd";
import { FC } from "react";

export interface CreateUavFormProp {}

interface FormItem {
  netWorkId: number;
  uavItem: unknown;
}

interface Form extends Record<"uavGroups", FormItem> {}

export const CreateUavForm: FC<CreateUavFormProp> = () => {
  const [form] = Form.useForm<FormItem[]>();
  return (
    <Form form={form}>
      <Form.List name="uavGroups">
        {(groupFields, { add: addGroup, remove: removeGroup }) => (
          <>
            {groupFields.map(
              (
                { key: groupKey, name: groupName, ...restGroupfeild },
                groupIndex
              ) => (
                <Form.List name="uavItem" key={groupKey} {...restGroupfeild}>
                  {(uavFields, { add: addUav, remove: removeUav }) => (
                    <>
                      {uavFields.map(
                        (
                          { key: uavKey, name: uavName, ...restUavFeild },
                          uavIndex
                        ) => (
                          <>
                            <Form.Item key={uavKey}>
                              <Input />
                            </Form.Item>
                          </>
                        )
                      )}
                      <Button onClick={addUav}>111</Button>
                    </>
                  )}
                </Form.List>
              )
            )}
            <Form.Item>
              <Button type="primary" onClick={addGroup}>
                添加
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </Form>
  );
};
