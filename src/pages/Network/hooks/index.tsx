import { useConfig } from "@/hooks";
import {
  CheckCircleFilled,
  CloseCircleFilled,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import { Typography } from "antd";
import { ReactNode, useMemo } from "react";

export const useStatusDescription = (): Record<
  number,
  {
    icon: ReactNode;
    description: ReactNode;
  }
> => {
  const LanguageText = useConfig().useLanguage!<"Network">("Network");

  return useMemo(
    () =>
      ({
        1: {
          icon: <ExclamationCircleFilled style={{ color: "#faad14" }} />,
          description: (
            <Typography.Text type="warning">
              {LanguageText.initStatus}
            </Typography.Text>
          ),
        },
        2: {
          icon: <CheckCircleFilled style={{ color: "#52c41a" }} />,
          description: (
            <Typography.Text type="success">
              {LanguageText.doneStatus}
            </Typography.Text>
          ),
        },
        3: {
          icon: <CloseCircleFilled style={{ color: "#ff4d4f" }} />,
          description: (
            <Typography.Text type="danger">
              {LanguageText.errorStatus}
            </Typography.Text>
          ),
        },
      } as const),
    [LanguageText]
  );
};
