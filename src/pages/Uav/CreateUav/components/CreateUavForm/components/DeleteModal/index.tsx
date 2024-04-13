import { useLanguageContext } from "@/hooks";
import { Modal } from "antd";
import { SetStateAction } from "jotai";
import { Dispatch, FC } from "react";

export interface DeleteModalProp {
  deleteModal: boolean;
  setDeleteModal: Dispatch<SetStateAction<boolean>>;
  onOk: () => void;
}

export const DeleteModal: FC<DeleteModalProp> = ({
  deleteModal,
  setDeleteModal,
  onOk,
}) => {
  const { LanguageText } = useLanguageContext<"Uav">();
  return (
    <Modal
      open={deleteModal}
      onCancel={() => setDeleteModal(false)}
      title={LanguageText.confirmTitle}
      onOk={onOk}
    >
      {LanguageText.confirmAlert}
    </Modal>
  );
};
