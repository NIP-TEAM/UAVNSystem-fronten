import { FC } from "react";
import { ProtocolDataType } from "@/service/Network";

export interface FeatureProp {
    featureList: ProtocolDataType["feature"]
}

export const Feature: FC<FeatureProp> = () => {
    return <div>111</div>
}