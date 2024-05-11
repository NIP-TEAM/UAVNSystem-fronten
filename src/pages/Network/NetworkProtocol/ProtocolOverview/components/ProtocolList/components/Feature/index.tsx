import { FC } from "react";
import { ProtocolDataType } from "@/service/Network";
import { Empty, Flex } from "antd";

export interface FeatureProp {
  featureList: ProtocolDataType["feature"];
}

export const Feature: FC<FeatureProp> = ({ featureList }) => {
    // TODO: build this later
  return (
    <Flex
      style={{ width: "100%", height: 128, overflowY: "auto" }}
      wrap="wrap"
      justify="flex-start"
    >
      {featureList.length ? (
        featureList.map((item) => (
          <div key={item} style={{ width: "50%", padding: "0 0.5em" }}>
            {item}
          </div>
        ))
      ) : (
        <Empty />
      )}
    </Flex>
  );
};
