import { BasicCard } from "@/components";
import { FC } from "react";
import { ProtocolHeader, ProtocolList } from "./components";

export interface NetworkTypeProp {}

export const NetworkProtocol: FC<NetworkTypeProp> = () => {
  return (
    <BasicCard style={{overflowX: 'auto'}}>
      <ProtocolHeader />
      <ProtocolList />
    </BasicCard>
  );
};
