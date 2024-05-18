import { AppContext } from "@/App";
import { useLanguageContext } from "@/hooks";
import { useContactGlobalContext } from "@/pages/Email/Contact/ContactList/hooks";
import { useUpdateContactList } from "@/service";
import { CheckOutlined, CloseOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Flex, Input, Typography } from "antd";
import { FC, useContext, useEffect, useState } from "react";

export interface CollapseHeaderProp {
  id: number;
  name: string;
  requestCheck: boolean;
  refresh?: () => void;
}

export const CollapseHeader: FC<CollapseHeaderProp> = ({
  id,
  name,
  requestCheck,
  refresh,
}) => {
  const { messageApi } = useContext(AppContext);
  const { LanguageText } = useLanguageContext<"Contact">();
  const { fetchContactList } = useContactGlobalContext();

  const [edit, setEdit] = useState(false);

  //   update list name
  const [newName, setNewName] = useState("");
  useEffect(() => {
    setNewName(name);
  }, [name]);
  const {
    fetchData: fetchUpdate,
    error: updateError,
    code: updateCode,
    loading: updateLoading,
  } = useUpdateContactList(id, { name: newName });

  useEffect(() => {
    if (updateError) messageApi?.error(updateError);
  }, [updateError, messageApi]);
  useEffect(() => {
    if (updateCode === 200) {
      fetchContactList?.();
      refresh?.();
      messageApi?.success(LanguageText.updateSuccess);
      setEdit(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [LanguageText.updateSuccess, messageApi, updateCode]);

  return (
    <Flex align="baseline" justify="space-between">
      <Flex align="center" onClick={(e) => e.stopPropagation()}>
        {edit ? (
          <>
            <Input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              disabled={updateLoading}
            />
            <Button
              icon={<CheckOutlined />}
              type="link"
              loading={updateLoading}
              onClick={() => {
                if (newName !== name) fetchUpdate?.();
                else setEdit(false);
              }}
            />
            <Button
              type="link"
              icon={
                <CloseOutlined
                  onClick={() => {
                    setNewName(name);
                    setEdit(false);
                  }}
                />
              }
            />
          </>
        ) : (
          <>
            <Typography.Text strong>{name}</Typography.Text>
            {requestCheck && (
              <Button
                icon={<EditOutlined />}
                onClick={() => setEdit(true)}
                type="link"
              />
            )}
          </>
        )}
      </Flex>
      {requestCheck && (
        <Typography.Link>{LanguageText.showDetail}</Typography.Link>
      )}
    </Flex>
  );
};
