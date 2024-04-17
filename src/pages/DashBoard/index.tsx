import { FC } from "react";
import { useNavigate } from "react-router";
import { NetworksStructure } from "./components";

interface DashBoardProp {}

export const DashBoard: FC<DashBoardProp> = () => {
    const navigate = useNavigate()
    return <>
        DASHBOARD
        <NetworksStructure />
    </>
}