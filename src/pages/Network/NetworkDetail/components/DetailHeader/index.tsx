import { useLanguageContext } from "@/hooks";
import { Button, Flex, Typography } from "antd";
import { SetStateAction } from "jotai";
import { Dispatch, FC } from "react";

export interface NetworkDetailHeaderProp {
  name?: string;
  editing: boolean;
  setEditing: Dispatch<SetStateAction<boolean>>;
  fetchDetailData?: () => void;
  detailLoading: boolean
}

export const NetworkDetailHeader: FC<NetworkDetailHeaderProp> = ({
  name,
  editing,
  setEditing,
  fetchDetailData,
  detailLoading
}) => {
  const { LanguageText } = useLanguageContext<"NetworkDetail">();

  return (
    <Flex justify="space-between" align="baseline">
      <Typography.Title level={4}>
        {LanguageText.detailTitle}: {name}
      </Typography.Title>
      <Flex justify="center" align="center" gap="small">
        {editing ? (
          <>
            <Button onClick={() => setEditing(false)} htmlType="reset">
              {LanguageText.editingCancel}
            </Button>
            <Button type="primary" htmlType="submit">
              {LanguageText.editingConfirm}
            </Button>
          </>
        ) : (
          <>
            <Button type="primary" onClick={() => fetchDetailData?.()} loading={detailLoading}>
              {LanguageText.refreshButton}
            </Button>
            <Button type="primary" onClick={() => setEditing(true)}>
              {LanguageText.editingButton}
            </Button>
          </>
        )}
      </Flex>
    </Flex>
  );
};
