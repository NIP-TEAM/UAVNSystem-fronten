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
      <Typography.Title level={5} style={{ margin: 0 }}>
        {LanguageText.structureTitle}
      </Typography.Title>
      <Flex style={{ width: "100%", overflowX: "auto" }} gap="small">
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
      </Flex>
    </BasicCard>
  );
};
