import { AppContext } from "@/App";
import { useLanguageContext } from "@/hooks";
import { useDeleteNetworkData } from "@/service";
import { Modal, Typography } from "antd";
import {
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

interface DeleteTipProp {
  selectedIds: string[];
  setTimestamp: Dispatch<SetStateAction<number>>;
}

export const DeleteTip: FC<DeleteTipProp> = ({ selectedIds, setTimestamp }) => {
  const { messageApi } = useContext(AppContext);
  const { LanguageText } = useLanguageContext<"Network">();
  const [open, setOpen] = useState(false);
  const { fetchData, loading, error, code } = useDeleteNetworkData({
    ids: selectedIds,
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
