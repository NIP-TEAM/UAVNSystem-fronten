import { FC } from "react";
import { Header } from "./components";
import { BasicCard } from "@/components";

export interface EmailListProp {}

export const EmailList: FC<EmailListProp> = () => {
  return (
    <BasicCard>
      <Header />
    </BasicCard>
  );
};
