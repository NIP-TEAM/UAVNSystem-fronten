import { useLanguageContext } from "@/hooks";
import { Modal, Typography } from "antd";
import { FC, useState } from "react";

interface DeleteTipProp {
  selectedIds: string[];
}

export const DeleteTip: FC<DeleteTipProp> = ({ selectedIds }) => {
  const { LanguageText } = useLanguageContext<"Network">();
  const [open, setOpen] = useState(false);
  return (
    <>
      <div role="button" onClick={() => setOpen(true)}>
        <Typography.Text type="danger">{LanguageText.delete}</Typography.Text>
      </div>
      <Modal
        open={open}
        okText={LanguageText.confirm}
        cancelText={LanguageText.cancel}
        onCancel={() => setOpen(false)}
        title={LanguageText.alert}
      >
        <div>{LanguageText.deleteTip} {LanguageText.total}: {selectedIds.length}</div>
      </Modal>
    </>
  );
};
