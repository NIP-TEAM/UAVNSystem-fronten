import { useLanguageContext } from "@/hooks";
import { UserInfo, userAtom } from "@/store";
import { Form, Typography } from "antd";
import { useAtomValue } from "jotai";
import { FC } from "react";
import { InfoShowcase } from "../components";
import { BasicCard } from "@/components";

export interface SelfCenterProp {}

export const SelfCenter: FC<SelfCenterProp> = () => {
  const { userInfo } = useAtomValue(userAtom);
  const { LanguageText } = useLanguageContext<"User">();

  const [form] = Form.useForm<UserInfo>();

  return (
    <BasicCard>
      <Typography.Title level={4}>{LanguageText.UserTitle}</Typography.Title>
      <InfoShowcase {...{ form, userInfo }} />
    </BasicCard>
  );
};
