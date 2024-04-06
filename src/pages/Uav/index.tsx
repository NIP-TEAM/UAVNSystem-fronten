import { Card, Typography } from "antd";
import { FC } from "react";
import { Filter } from "./components";

interface UavProp {}

export const Uav: FC<UavProp> = () => {
  return (
    <Card>
      <Typography.Title level={4}>UAV(s)</Typography.Title>
      <Filter />
    </Card>
  );
};
