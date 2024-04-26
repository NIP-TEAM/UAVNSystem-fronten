import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Modal } from "antd";
import { FC, useState } from "react";

export interface NewContactListModalProp
  extends NewContactListModalContentProp {}

export const NewContactListModal: FC<NewContactListModalProp> = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        type="link"
        icon={<PlusOutlined />}
        onClick={() => setOpen(true)}
      />
      <Modal
        open={open}
        onCancel={() => setOpen(true)}
        okButtonProps={{ htmlType: "submit" }}
      >
        <NewContactListModalContent />
      </Modal>
    </>
  );
};

interface NewContactListModalContentProp {}

const NewContactListModalContent: FC<NewContactListModalContentProp> = () => {
  const [form] = Form.useForm();
  return (
    <Form
      form={form}
      onFinish={() => {
        console.log("111");
      }}
    >
      content
    </Form>
  );
};
