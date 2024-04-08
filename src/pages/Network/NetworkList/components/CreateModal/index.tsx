import { useLanguageContext } from "@/hooks";
import { Button, Modal } from "antd";
import { FC, useState } from "react";

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
      >
        111
      </Modal>
    </>
  );
};
