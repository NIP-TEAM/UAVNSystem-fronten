import { useLanguageContext } from "@/hooks";
import { QuestionCircleFilled } from "@ant-design/icons";
import { Button, Flex, Tooltip, Typography } from "antd";
import { Dispatch, FC, SetStateAction } from "react";
import { DeleteModal, DeleteModalProp } from "./components";

export interface HeaderProp {
  editing: boolean;
  setEditing: Dispatch<SetStateAction<boolean>>;
  editable: boolean;
  id: DeleteModalProp['id'];
}

export const Header: FC<HeaderProp> = ({
  editable,
  setEditing,
  editing,
  id,
}) => {
  
  const { LanguageText } = useLanguageContext<"Email">();

  return (
    <Flex align="baseline" justify="space-between">
      <Typography.Title level={4} style={{ marginTop: 0 }}>
        {LanguageText.EmailDetailTitle}
      </Typography.Title>
      <Flex align="baseline" gap="small">
        <Typography.Text>
          {LanguageText.scheduleFieldTitle}:{" "}
          {editable
            ? LanguageText.scheduleIsStopping
            : LanguageText.scheduleIsRunning}
        </Typography.Text>
        <Tooltip title={LanguageText.editableTip}>
          <QuestionCircleFilled />
        </Tooltip>
        <Button
          type={editing ? undefined : "primary"}
          disabled={!editable}
          onClick={() => setEditing((prev) => !prev)}
        >
          {editing ? LanguageText.editCancel : LanguageText.EmailButtonTitle}
        </Button>
        <DeleteModal id={id} editable={editable} />
      </Flex>
    </Flex>
  );
};
