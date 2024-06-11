import { BasicCard } from "@/components";
import { FC } from "react";
import { CreateUavForm, CreateUavHeader } from "./components";

export interface CreateUavProp {}

export const CreateUav: FC<CreateUavProp> = () => {
  return (
    <BasicCard>
      <CreateUavHeader />
      <CreateUavForm />
    </BasicCard>
  );
};
