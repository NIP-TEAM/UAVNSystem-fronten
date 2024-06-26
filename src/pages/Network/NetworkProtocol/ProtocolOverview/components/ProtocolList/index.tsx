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
import { DeleteModal } from "./components";
import { BasicPagination } from "@/types";
import { SetStateAction } from "jotai";
import { basicTimeFormate } from "@/utils";

export interface ProtocolListProp {
  protocolData: ProtocolDataType[];
  loading: boolean;
  pagination: BasicPagination;
  setPagination: Dispatch<SetStateAction<BasicPagination>>;
  storageFunc: () => void;
}

export const ProtocolList: FC<ProtocolListProp> = ({
  protocolData,
  loading,
  pagination,
  setPagination,
  storageFunc,
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
      onClick: () => {
        storageFunc();
        navigate("/network/Protocol/edit/" + currentId);
      },
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
                <Flex
                  vertical
                  gap="small"
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
                        onClick={() => {
                          storageFunc();
                          navigate("/network/" + networkItem.id);
                        }}
                      >
                        {networkItem.name}
                        {index !== (item?.networks?.length || 0) - 1
                          ? ", "
                          : " "}
                      </Typography.Link>
                    ))}
                  </Typography>
                  <Typography>
                    <Typography.Text strong>
                      {LanguageText.creatorLabel}
                    </Typography.Text>
                    <Typography.Link
                      onClick={() => navigate("/user/" + item?.creator?.id)}
                      disabled={item?.isDefault}
                    >
                      @{item?.creator?.name || "SYSTEM"}
                    </Typography.Link>
                  </Typography>
                  <Typography>
                    <Typography.Text strong>
                      {LanguageText.createAtLabel}
                    </Typography.Text>
                    <Typography.Text type="secondary">
                      {basicTimeFormate(item?.createAt)}
                    </Typography.Text>
                  </Typography>
                  <Typography>
                    <Typography.Text strong>
                      {LanguageText.updateAtLabel}
                    </Typography.Text>
                    <Typography.Text type="secondary">
                      {basicTimeFormate(item?.updateAt)}
                    </Typography.Text>
                  </Typography>
                </Flex>
              }
              extra={
                <>
                  <Dropdown
                    menu={{
                      items: actionItems(item.id),
                    }}
                    trigger={["click"]}
                    disabled={item.isDefault}
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
