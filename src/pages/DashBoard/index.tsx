import { FC } from "react";
import { NetworksStructure } from "./components";

interface DashBoardProp {}

export const DashBoard: FC<DashBoardProp> = () => {
    return <>
        DASHBOARD
        <NetworksStructure />
    </>
}