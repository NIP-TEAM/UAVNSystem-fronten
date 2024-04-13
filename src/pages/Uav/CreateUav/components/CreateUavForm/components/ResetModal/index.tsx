import { useLanguageContext } from "@/hooks";
import { Button, Modal } from "antd";
import { FC, useState } from "react";

export interface ResetModalProp {
  reset: () => void;
}

export const ResetModal: FC<ResetModalProp> = ({ reset }) => {
  const { LanguageText } = useLanguageContext<"Uav">();
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>{LanguageText.clearLabel}</Button>
      <Modal open={open} onOk={reset} onCancel={() => setOpen(false)}>
        {LanguageText.clearAlert}
      </Modal>
    </>
  );
};
