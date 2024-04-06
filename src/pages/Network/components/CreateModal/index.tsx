import { Button, Modal } from "antd";
import { FC, useState } from "react";
import { NetworkLanguageType } from "../..";

export interface CreateModalProp {
  NetworkText: NetworkLanguageType;
}

export const CreateModal: FC<CreateModalProp> = ({ NetworkText }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button type="primary" onClick={() => setIsOpen(true)}>
        {NetworkText.new}
      </Button>
      <Modal
        open={isOpen}
        okText={NetworkText.newConfirm}
        cancelText={NetworkText.newCancel}
        onCancel={() => setIsOpen(false)}
      >
        111
      </Modal>
    </>
  );
};
