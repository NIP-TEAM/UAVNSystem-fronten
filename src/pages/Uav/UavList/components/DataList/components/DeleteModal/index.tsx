import { AppContext } from "@/App";
import { useLanguageContext } from "@/hooks";
import { useDeleteUav } from "@/service/Uav";
import { Typography, Modal } from "antd";
import {
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

export interface DeleteModalProp {
  selectedIds: string[];
  setTimestamp: Dispatch<SetStateAction<number>>;
}

export const DeleteModal: FC<DeleteModalProp> = ({
  selectedIds,
  setTimestamp,
}) => {
  const { messageApi } = useContext(AppContext);
  const { LanguageText } = useLanguageContext<"Uav">();
  const [open, setOpen] = useState(false);
  const { fetchData, code, error, loading } = useDeleteUav({
    ids: selectedIds
  });
  useEffect(() => {
    if (error) messageApi?.error(error);
  }, [error, messageApi]);
  useEffect(() => {
    if (code === 200) {
      messageApi?.success(LanguageText.deleteSuccess);
      setOpen(false);
      setTimestamp(new Date().getTime());
    }
  }, [LanguageText.deleteSuccess, code, messageApi, setTimestamp]);

  const handleDelete = () => {
    fetchData?.();
  };

  return (
    <>
      <Typography.Text onClick={() => setOpen(true)} type="danger">
        {LanguageText.delete}
      </Typography.Text>
      <Modal
        open={open}
        okText={LanguageText.confirm}
        cancelText={LanguageText.cancel}
        onCancel={() => setOpen(false)}
        confirmLoading={loading}
        onOk={handleDelete}
        title={LanguageText.alert}
      >
        <Typography.Text>
          {LanguageText.deleteTip} {LanguageText.total}: {selectedIds.length}
        </Typography.Text>
      </Modal>
    </>
  );
};
