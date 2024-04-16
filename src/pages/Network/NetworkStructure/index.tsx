import { BasicCard } from "@/components";
import { FC } from "react";
import { StructureHeader, StructureList } from "./components";

export interface NetworkTypeProp {}

export const NetworkStructure: FC<NetworkTypeProp> = () => {
  return (
    <BasicCard>
      <StructureHeader />
      <StructureList />
    </BasicCard>
  );
};
