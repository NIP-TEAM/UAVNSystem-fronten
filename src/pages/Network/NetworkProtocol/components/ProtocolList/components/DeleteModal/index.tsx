import { AppContext } from "@/App";
import { useLanguageContext } from "@/hooks";
import { useDeleteProtocal } from "@/service";
import { Modal, Typography } from "antd";
import { FC, useContext, useEffect, useState } from "react";

export interface DeleteModalProp {
  id: number;
}

export const DeleteModal: FC<DeleteModalProp> = ({ id }) => {
  const { LanguageText } = useLanguageContext<"NetworkProtocol">();
  const { messageApi } = useContext(AppContext);
  const [open, setOpen] = useState(false);

  const {
    fetchData: fetchDeleteProtocal,
    loading: deleteLoading,
    code: deleteCode,
    error: deleteError,
  } = useDeleteProtocal({ id });
  useEffect(() => {
    if (deleteError) messageApi?.error(deleteError);
  }, [deleteError, messageApi]);
  useEffect(() => {
    if (deleteCode === 200) {
      messageApi?.success(LanguageText.deleteSuccess);
      setOpen(false);
    }
  }, [LanguageText.deleteSuccess, deleteCode, messageApi, setOpen]);

  return (
    <>
      <Typography.Text type="danger" onClick={() => setOpen(true)}>
        {LanguageText.deleteAction}
      </Typography.Text>
      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        onOk={() => fetchDeleteProtocal?.()}
        title={LanguageText.deleteTitle}
        cancelText={LanguageText.deleteCancel}
        okText={LanguageText.deleteConfirm}
        confirmLoading={deleteLoading}
      >
        {LanguageText.deleteTip}
      </Modal>
    </>
  );
};
