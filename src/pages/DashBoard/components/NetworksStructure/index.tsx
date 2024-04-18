import { BasicCard, NetworkStructure } from "@/components";
import { useLanguageContext } from "@/hooks";
import { BasicPagination } from "@/types";
import { Flex, Typography } from "antd";
import { FC, useState } from "react";

export interface NetworksStructureProp {}

const defaultPagination: BasicPagination = {
  current: 1,
  pageSize: 10,
  total: 10,
} as const;

export const NetworksStructure: FC<NetworksStructureProp> = () => {
  const { LanguageText } = useLanguageContext<"Dashboard">();
  const [pagination, setPagination] = useState();
  return (
    <BasicCard>
      <Typography.Title level={5} style={{ marginTop: 0 }}>
        {LanguageText.structureTitle}
      </Typography.Title>
      <Flex
        style={{ width: "100%", overflowX: "auto", padding: "1em 0" }}
        gap="small"
      >
        <BasicCard hoverable>
          <NetworkStructure
            {...{
              connectMap: "[[1,2],[2,3],[3,4],[1,4],[0,1],[2,1]]",
              style: { width: "24em", height: "10em" },
              title: "name",
              uavs: [
                {
                  id: 1,
                  name: 'uav1'
                },
                {
                  id: 2,
                  name: 'uav2'
                },
                {
                  id: 3,
                  name :'uav3'
                },
                {
                  id: 4,
                  name: 'uav4'
                },
                {
                  id: 5,
                  name: 'uav5'
                }
              ]
            }}
          />
        </BasicCard>
        {/* <BasicCard>
          name
          <NetworkStructure
            {...{ connectMap: "[[1,2],[2,3],[3,4],[1,4],[0,1],[2,1]]" }}
          />
        </BasicCard>
        <BasicCard>
          name
          <NetworkStructure
            {...{ connectMap: "[[1,2],[2,3],[3,4],[1,4],[0,1],[2,1]]" }}
          />
        </BasicCard>
        <BasicCard>
          name
          <NetworkStructure
            {...{ connectMap: "[[1,2],[2,3],[3,4],[1,4],[0,1],[2,1]]" }}
          />
        </BasicCard>
        <BasicCard>
          name
          <NetworkStructure
            {...{ connectMap: "[[1,2],[2,3],[3,4],[1,4],[0,1],[2,1]]" }}
          />
        </BasicCard>
        <BasicCard>
          name
          <NetworkStructure
            {...{ connectMap: "[[1,2],[2,3],[3,4],[1,4],[0,1],[2,1]]" }}
          />
        </BasicCard>
        <BasicCard>
          name
          <NetworkStructure
            {...{ connectMap: "[[1,2],[2,3],[3,4],[1,4],[0,1],[2,1]]" }}
          />
        </BasicCard>
        <BasicCard>
          name
          <NetworkStructure
            {...{ connectMap: "[[1,2],[2,3],[3,4],[1,4],[0,1],[2,1]]" }}
          />
        </BasicCard> */}
      </Flex>
    </BasicCard>
  );
};
