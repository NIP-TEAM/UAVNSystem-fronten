import { useLanguageContext } from "@/hooks";
import { Button, Modal } from "antd";
import { FC, useState } from "react";

export interface CsvModalProp extends CsvModalMainContentProp {}

export const CsvModal: FC<CsvModalProp> = () => {
  const { LanguageText } = useLanguageContext<"Uav">();
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        {LanguageText.importButton}
      </Button>
      <Modal
        open={open}
        title={LanguageText.importButton}
        onCancel={() => setOpen(false)}
      >
        <CsvModalMainContent />
      </Modal>
    </>
  );
};

interface CsvModalMainContentProp {}

const CsvModalMainContent: FC<CsvModalMainContentProp> = () => {
  return <div>import from csv</div>;
};
