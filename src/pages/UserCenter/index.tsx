import { Button } from "antd";
import { FC } from "react"
import { useNavigate } from "react-router"

interface UserCenterProp {}

export const UserCenter: FC<UserCenterProp> = () => {
    const navigate = useNavigate();
    return <div>
        <Button onClick={() => navigate('/dashboard')}></Button>
    </div>
}