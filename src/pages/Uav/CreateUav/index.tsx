import { BasicCard } from "@/components";
import { LanguageProvider } from "@/hooks";
import { FC } from "react";
import { CreateUavForm, CreateUavHeader } from "./components";

export interface CreateUavProp {}

export const CreateUav: FC<CreateUavProp> = () => {
  return (
    <LanguageProvider textKey="Uav">
      <BasicCard>
        <CreateUavHeader />
        <CreateUavForm />
      </BasicCard>
    </LanguageProvider>
  );
};
