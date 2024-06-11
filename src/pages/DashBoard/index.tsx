import { FC } from "react";
import { CountData, Creators, NetworksStructure } from "./components";
import { Col, Row } from "antd";
import { DashboardGlobalProvider } from "./hooks";

interface DashBoardProp {}

export const DashBoard: FC<DashBoardProp> = () => {
  return (
    <DashboardGlobalProvider>
      <Row gutter={[0, 8]} style={{ marginTop: 8 }}>
        <Col span={16}>
          <CountData />
        </Col>
        <Col span={8}>
          <Creators />
        </Col>
        <Col span={24}>
          <NetworksStructure />
        </Col>
      </Row>
    </DashboardGlobalProvider>
  );
};
