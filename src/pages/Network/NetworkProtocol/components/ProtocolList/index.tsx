import { useLanguageContext } from "@/hooks";
import { NetworkProtocal } from "@/service";
import { Flex, Card, Dropdown, Typography, MenuProps } from "antd";
import { FC } from "react";
import { useNavigate } from "react-router";
import { DeleteModal } from "./components";

export interface ProtocolListProp {}

const protocolData: NetworkProtocal[] = [
  {
    id: 1,
    name: "test",
    type: "customer",
    createAt: new Date().getTime().toString(),
    updateAt: new Date().getTime().toString(),
    networks: [
      { name: "test1", id: 1 },
      { name: "test2", id: 2 },
      { name: "test3", id: 3 },
    ],
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

export const ProtocolList: FC<ProtocolListProp> = () => {
  const navigate = useNavigate();
  const { LanguageText } = useLanguageContext<"NetworkProtocol">();
  const actionItems = (currentId: number): MenuProps["items"] => [
    {
      key: "delete",
      label: <DeleteModal id={currentId} />,
    },
    {
      key: "edit",
      label: LanguageText.editLink,
      onClick: () => navigate("/network/Protocol/edit"),
    },
  ];

  return (
    <Flex
      align="center"
      justify="flex-start"
      wrap="wrap"
      gap="large"
      style={{ minWidth: 1024 }}
    >
      {protocolData.map((item) => (
        <Card
          key={item.id}
          title={LanguageText.protocalTitle + " : " + item.name}
          style={{
            width: "calc(94% /3)",
          }}
          hoverable
          cover={
            <div
              style={{
                overflow: "auto",
                padding: "0.5em 1.5em",
              }}
            >
              <Typography>
                <Typography.Text strong>
                  {LanguageText.usageNework}
                </Typography.Text>
                {item?.networks?.map((networkItem, index) => (
                  <Typography.Link onClick={() => navigate('/network/' + networkItem.id)}>
                    {networkItem.name}
                    {index !== (item?.networks?.length || 0) - 1 ? ", " : " "}
                  </Typography.Link>
                ))}
              </Typography>
            </div>
          }
          extra={
            <>
              <Dropdown
                menu={{
                  items: actionItems(item.id),
                }}
                trigger={["click"]}
              >
                <Typography.Link>{LanguageText.moreButton}</Typography.Link>
              </Dropdown>
            </>
          }
        />
      ))}
    </Flex>
  );
};
