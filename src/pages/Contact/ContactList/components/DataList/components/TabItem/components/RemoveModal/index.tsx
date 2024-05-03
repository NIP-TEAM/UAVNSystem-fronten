import { useLanguageContext } from "@/hooks";
import { Button, Modal } from "antd";
import { FC, useState } from "react";

export interface RemoveModalProp {
    id: number
}

export const RemoveModal: FC<RemoveModalProp> = () => {
  const { LanguageText } = useLanguageContext<"Contact">();
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button danger type="link" onClick={() => setOpen(true)} size="small">
        {LanguageText.removeTitle}
      </Button>
      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        title={LanguageText.removeModalTitle}
      >
        111
      </Modal>
    </>
  );
};
