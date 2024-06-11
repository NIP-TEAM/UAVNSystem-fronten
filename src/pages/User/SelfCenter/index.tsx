import { useLanguageContext } from "@/hooks";
import { UserInfo, userAtom } from "@/store";
import { Flex, Form, Typography } from "antd";
import { useAtomValue } from "jotai";
import { FC } from "react";
import { InfoShowcase } from "../components";
import { BasicCard } from "@/components";
import { LogoutModal } from "./components";

export interface SelfCenterProp {}

export const SelfCenter: FC<SelfCenterProp> = () => {
  const { userInfo } = useAtomValue(userAtom);
  const { LanguageText } = useLanguageContext<"User">();

  const [form] = Form.useForm<UserInfo>();

  return (
    <BasicCard>
      <Typography.Title level={4}>{LanguageText.userTitle}</Typography.Title>
      <InfoShowcase {...{ form, userInfo }} />
      <Flex justify="end">
        <LogoutModal />
      </Flex>
    </BasicCard>
  );
};
