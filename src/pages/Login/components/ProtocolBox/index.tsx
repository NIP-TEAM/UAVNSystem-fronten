import { Button, Modal } from "antd";
import { FC, useState } from "react";
import { ButtonNoStyle } from "../../style";

interface ProtocalProp {}

interface ProtocalBoxProp extends ProtocalProp {}

export const ProtocalBox: FC<ProtocalBoxProp> = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button type="link" onClick={() => setIsOpen(true)} style={ButtonNoStyle}>
        《协议名称》
      </Button>
      <Modal open={isOpen} onOk={() => setIsOpen(false)}>
        <Protocal />
      </Modal>
    </>
  );
};

const Protocal: FC<ProtocalProp> = () => {
  return <>协议内容</>;
};
