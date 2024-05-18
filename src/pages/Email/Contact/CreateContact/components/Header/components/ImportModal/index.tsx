import { useLanguageContext } from "@/hooks";
import { Button, Modal } from "antd";
import { FC, useState } from "react";

export interface ImportModalProp {}

export const ImportModal: FC<ImportModalProp> = () => {
  const { LanguageText } = useLanguageContext<"CreateContact">();
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>{LanguageText.importTitle}</Button>
        <Modal open={open} onCancel={() => setOpen(false)} title="import title (building...)">
            import modal (building...)
        </Modal>
    </>
  );
};
