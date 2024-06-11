import { AppContext } from "@/App";
import { useLanguageContext } from "@/hooks";
import { useDeleteEmail } from "@/service";
import { Button, Modal } from "antd";
import { FC, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

export interface DeleteModalProp {
  id: number;
  editable: boolean;
}

export const DeleteModal: FC<DeleteModalProp> = ({ id, editable }) => {
  const { messageApi } = useContext(AppContext);
  const navigate = useNavigate();
  const { LanguageText } = useLanguageContext<"Email">();
  const [open, setOpen] = useState(false);

  const {
    fetchData: fetchDelete,
    code: deleteEmailCode,
    error: deleteEmailError,
    loading: deleteEmailLoading,
  } = useDeleteEmail(id);
  useEffect(() => {
    if (deleteEmailError) messageApi?.error(deleteEmailError);
  }, [deleteEmailError, messageApi]);
  useEffect(() => {
    if (deleteEmailCode === 200) {
      navigate("/email/list");
      messageApi?.success(LanguageText.removeSuccess);
    }
  }, [LanguageText.removeSuccess, deleteEmailCode, messageApi, navigate]);

  return (
    <>
      <Button
        danger
        type="primary"
        disabled={!editable}
        onClick={() => setOpen(true)}
      >
        {LanguageText.removeButtonTitle}
      </Button>
      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        onOk={() => fetchDelete?.()}
        confirmLoading={deleteEmailLoading}
      >
        {LanguageText.removeAlert}
      </Modal>
    </>
  );
};
