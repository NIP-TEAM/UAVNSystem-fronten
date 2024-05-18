import { useLanguageContext } from "@/hooks";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import { FC, useState } from "react";

export interface DeleteModalProp {
  removeItem: () => void;
}

export const DeleteModal: FC<DeleteModalProp> = ({ removeItem }) => {
  const { LanguageText } = useLanguageContext<"CreateContact">();
  const [open, setOpen] = useState(false);

  return (
    <div role="presentation" onClick={(e) => e.stopPropagation()}>
      <Button
        size="small"
        icon={<DeleteOutlined />}
        danger
        type="link"
        onClick={() => setOpen(true)}
      />
      <Modal
        title={LanguageText.deleteTitle}
        open={open}
        onOk={() => {
          removeItem(),
          setOpen(false)
        }}
        onCancel={() => setOpen(false)}
      >
        {LanguageText.deleteDescription}
      </Modal>
    </div>
  );
};
