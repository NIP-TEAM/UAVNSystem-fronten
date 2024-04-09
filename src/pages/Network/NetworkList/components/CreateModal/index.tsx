import { useLanguageContext } from "@/hooks";
import { Button, Flex, Form, Input, Modal } from "antd";
import { Dispatch, FC, SetStateAction, useState } from "react";

export interface CreateModalProp {}

export const CreateModal: FC<CreateModalProp> = () => {
  const { LanguageText } = useLanguageContext<"Network">();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button type="primary" onClick={() => setIsOpen(true)}>
        {LanguageText.new}
      </Button>
      <Modal
        open={isOpen}
        okText={LanguageText.confirm}
        cancelText={LanguageText.cancel}
        onCancel={() => setIsOpen(false)}
        title={LanguageText.createTitle}
        footer={false}
        destroyOnClose
      >
        <CreateModalMaintain setOpen={setIsOpen} />
      </Modal>
    </>
  );
};

interface CreateModalMaintainProp {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

interface FormItemProtocol {
  name: string;
  [key: string]: unknown;
}

const CreateModalMaintain: FC<CreateModalMaintainProp> = ({ setOpen }) => {
  const { LanguageText } = useLanguageContext<"Network">();
  const [form] = Form.useForm<FormItemProtocol>();
  const [formValue, setFormValue] = useState<FormItemProtocol>()

  const handleFinish = () => {
    console.log(formValue)
  }

  return (
    <Form form={form} layout="vertical" onFinish={handleFinish} onValuesChange={(newValue) => setFormValue(newValue)}>
      <Form.Item<FormItemProtocol>
        name="name"
        required
        rules={[{required: true}]}
        label={LanguageText.nameItem}
      >
        <Input style={{ width: "60%" }} />
      </Form.Item>
      <Form.Item>uavs setting</Form.Item>
      <Form.Item>
        <Flex align="center" justify="end" gap={5}>
          <Button onClick={() => setOpen(false)}>{LanguageText.cancel}</Button>
          <Button type="primary" htmlType="submit">{LanguageText.confirm}</Button>
        </Flex>
      </Form.Item>
    </Form>
  );
};
