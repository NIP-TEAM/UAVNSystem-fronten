import { useLanguageContext } from "@/hooks";
import { ProtocolDataType } from "@/service";
import {
  Flex,
  Card,
  Dropdown,
  Typography,
  MenuProps,
  Spin,
  Pagination,
  Empty,
} from "antd";
import { Dispatch, FC } from "react";
import { useNavigate } from "react-router";
import { DeleteModal, Feature } from "./components";
import { BasicPagination } from "@/types";
import { SetStateAction } from "jotai";

export interface ProtocolListProp {
  protocolData: ProtocolDataType[];
  loading: boolean;
  pagination: BasicPagination;
  setPagination: Dispatch<SetStateAction<BasicPagination>>;
}

export const ProtocolList: FC<ProtocolListProp> = ({
  protocolData,
  loading,
  pagination,
  setPagination,
}) => {
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
    <Spin spinning={loading}>
      <Flex
        align="center"
        justify="flex-start"
        wrap="wrap"
        gap="large"
        style={{ minWidth: 1024, marginBottom: 10 }}
      >
        {protocolData.length ? (
          protocolData.map((item) => (
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
                      <Typography.Link
                        key={networkItem.id}
                        onClick={() => navigate("/network/" + networkItem.id)}
                      >
                        {networkItem.name}
                        {index !== (item?.networks?.length || 0) - 1
                          ? ", "
                          : " "}
                      </Typography.Link>
                    ))}
                  </Typography>
                  <Feature featureList={item.feature || []} />
                </div>
              }
              extra={
                <>
                  <Dropdown
                    menu={{
                      items: actionItems(item.id),
                    }}
                    trigger={["click"]}
                    disabled={item.type !== 'customer'}
                  >
                    <Typography.Link>{LanguageText.moreButton}</Typography.Link>
                  </Dropdown>
                </>
              }
            />
          ))
        ) : (
          <Empty />
        )}
      </Flex>
      <Pagination
        pageSizeOptions={[5, 10, 20, 50]}
        {...pagination}
        showSizeChanger
        onChange={(current, pageSize) =>
          setPagination((prev) => ({
            ...prev,
            current,
            pageSize,
          }))
        }
      />
    </Spin>
  );
};
