import { useLanguageContext } from "@/hooks";
import { NetworkStructureProtocal } from "@/service";
import { Flex, Space, Card, Dropdown, Radio, Typography, Button } from "antd";
import { FC, useState } from "react";

export interface StructureListProp {}

const structureData: NetworkStructureProtocal[] = [
  {
    id: 1,
    name: "test",
    type: "customer",
    createAt: new Date().getTime().toString(),
    updateAt: new Date().getTime().toString(),
    network: { name: "test1", id: 1 },
    creator: { name: "creator1", id: 1 },
    feature: ["feature1"],
  },
  {
    id: 2,
    name: "test1",
    type: "DCR",
    createAt: new Date().getTime().toString(),
    updateAt: new Date().getTime().toString(),
    feature: ["feature1"],
  },
  {
    id: 3,
    name: "test2",
    type: "LCAD",
    createAt: new Date().getTime().toString(),
    updateAt: new Date().getTime().toString(),
    feature: ["feature1"],
  },
];

export const StructureList: FC<StructureListProp> = () => {
    const { LanguageText } = useLanguageContext<"NetworkStructure">()

  return (
    <Flex align="center" justify="flex-start" wrap="wrap" gap="large">
      {structureData.map((item) => (
        <Card
          key={item.id}
          title={item.name}
          style={{
            width: "calc(94% /3)",
          }}
          hoverable
          cover={
            <div
              style={{
                height: "120px",
                overflow: "auto",
                padding: "1px 0px 0px 1px",
              }}
            >
              {/* <Image
                  src={item.img}
                  preview={false}
                /> */}
            </div>
          }
          extra={
            <>
              <Dropdown
                  menu={{
                    items: [],
                  }}
                  trigger={['click']}

                >
                  <Typography.Link>
                  {LanguageText.moreButton}

                  </Typography.Link>
                </Dropdown>
            </>
          }
        />
      ))}
    </Flex>
  );
};
