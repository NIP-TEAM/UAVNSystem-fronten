import { AppContext } from "@/App";
import { useLanguageContext } from "@/hooks";
import { useDeleteContact } from "@/service";
import { Button, ButtonProps, Modal } from "antd";
import { FC, Key, useContext, useEffect, useState } from "react";

export interface RemoveModalProp {
  selectedRowKeys: Key[];
  handleSelect: () => void;
}

export const RemoveModal: FC<RemoveModalProp> = ({ selectedRowKeys, handleSelect }) => {
  const { messageApi } = useContext(AppContext);
  const { LanguageText } = useLanguageContext<"Contact">();
  const [open, setOpen] = useState(false);

  const {
    fetchData: fetchDelete,
    error: deleteError,
    code: deleteCode,
    loading: deleteLoading,
  } = useDeleteContact(selectedRowKeys);
  useEffect(() => {
    if (deleteError) messageApi?.error(deleteError);
  }, [deleteError, messageApi]);
  useEffect(() => {
    if (deleteCode === 200) {
      messageApi?.success(LanguageText.removeContactSuccess);
      setOpen(false);
    }
  }, [LanguageText.removeContactSuccess, deleteCode, messageApi]);

  const onClick: ButtonProps["onClick"] = () => {
    handleSelect(), setOpen(true);
  };

  return (
    <>
      <Button danger type="link" onClick={onClick} size="small">
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
