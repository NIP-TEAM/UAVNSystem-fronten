import { AppContext } from "@/App";
import { useLanguageContext } from "@/hooks";
import { useLogout } from "@/service";
import { userAtom } from "@/store";
import { Button, Modal } from "antd";
import { useAtom } from "jotai";
import { FC, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

export interface LogoutModalProp {}

export const LogoutModal: FC<LogoutModalProp> = () => {
  const { messageApi } = useContext(AppContext);
  const { LanguageText } = useLanguageContext<"User">();
  const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setUserInfo] = useAtom(userAtom);

  const [open, setOpen] = useState(false);

  //   logout
  const {
    fetchData: fetchLogout,
    error: logoutError,
    code: logoutCode,
    loading: logoutLoading,
  } = useLogout();
  useEffect(() => {
    if (logoutError) messageApi?.error(logoutError);
  }, [logoutError, messageApi]);
  useEffect(() => {
    if (logoutCode === 200) {
      messageApi?.success(LanguageText.logoutSuccess);
      setUserInfo({});
      navigate("/login");
    }
  }, [
    LanguageText.logoutSuccess,
    logoutCode,
    messageApi,
    navigate,
    setUserInfo,
  ]);

  return (
    <>
      <Button type="primary" danger onClick={() => setOpen(true)}>
        {LanguageText.logoutButton}
      </Button>
      <Modal
        open={open}
        title={LanguageText.logoutModalTitle}
        onOk={() => fetchLogout?.()}
        onCancel={() => setOpen(false)}
        confirmLoading={logoutLoading}
      >
        {LanguageText.logoutModalTip}
      </Modal>
    </>
  );
};
