import { useLanguageContext } from "@/hooks";
import { DeleteFilled } from "@ant-design/icons";
import { Button, Modal } from "antd";
import { FC, useState } from "react";

export interface DeleteModalProp {
  confirmHandle: () => void;
}

export const DeleteModal: FC<DeleteModalProp> = ({ confirmHandle }) => {
  const { LanguageText } = useLanguageContext<"Uav">();
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        danger
        type="text"
        onClick={() => setOpen(true)}
        icon={<DeleteFilled type="danger" />}
      />
      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        title={LanguageText.confirmTitle}
        onOk={() => {
          confirmHandle(), setOpen(false);
        }}
      >
        {LanguageText.confirmAlert}
      </Modal>
    </>
  );
};
