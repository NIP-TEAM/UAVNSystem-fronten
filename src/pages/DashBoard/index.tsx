import { Button } from "antd";
import { FC } from "react";
import { useNavigate } from "react-router";

interface DashBoardProp {}

export const DashBoard: FC<DashBoardProp> = () => {
    const navigate = useNavigate()
    return <div style={{height: 1000}}>
        <Button onClick={() => navigate('/usercenter')}> test </Button>
    </div>
}