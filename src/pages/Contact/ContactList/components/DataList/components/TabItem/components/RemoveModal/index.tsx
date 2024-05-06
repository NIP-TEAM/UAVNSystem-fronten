import { AppContext } from "@/App";
import { useLanguageContext } from "@/hooks";
import { useDeleteContact } from "@/service";
import { Button, Modal } from "antd";
import { FC, useContext, useEffect, useState } from "react";

export interface RemoveModalProp {
  id: number;
}

export const RemoveModal: FC<RemoveModalProp> = ({ id }) => {
  const { messageApi } = useContext(AppContext);
  const { LanguageText } = useLanguageContext<"Contact">();
  const [open, setOpen] = useState(false);

  const {
    fetchData: fetchDelete,
    error: deleteError,
    code: deleteCode,
    loading: deleteLoading,
  } = useDeleteContact([id]);
  useEffect(() => {
    if (deleteError) messageApi?.error(deleteError);
  }, [deleteError, messageApi]);
  useEffect(() => {
    if (deleteCode === 200) {
      messageApi?.success(LanguageText.removeContactSuccess);
      setOpen(false);
    }
  }, [LanguageText.removeContactSuccess, deleteCode, messageApi]);

  return (
    <>
      <Button danger type="link" onClick={() => setOpen(true)} size="small">
        {LanguageText.removeTitle}
      </Button>
      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        onOk={() => fetchDelete?.()}
        confirmLoading={deleteLoading}
        title={LanguageText.removeModalTitle}
      >
        {LanguageText.removeContactTips}
      </Modal>
    </>
  );
};
