import { BasicCard } from "@/components";
import { FC } from "react";

export interface CountDataProp {}

export const CountData: FC<CountDataProp> = () => {
    return <BasicCard style={{height: '100%'}} hoverable>111</BasicCard>
}