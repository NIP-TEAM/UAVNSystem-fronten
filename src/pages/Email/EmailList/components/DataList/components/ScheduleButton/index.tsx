import { AppContext } from "@/App";
import { useLanguageContext } from "@/hooks";
import { useHandleSchedule } from "@/service";
import { Button } from "antd";
import { Dispatch, FC, SetStateAction, useContext, useEffect } from "react";

export interface ScheduleButtonProp {
  onSchedule: boolean;
  id: number;
  setTimestamp: Dispatch<SetStateAction<number>>;
}

export const ScheduleButton: FC<ScheduleButtonProp> = ({
  onSchedule,
  id,
  setTimestamp,
}) => {
  const { messageApi } = useContext(AppContext);
  const { LanguageText } = useLanguageContext<"Email">();

  //   handle schedule
  const {
    fetchData: fetchSchedule,
    code: scheduleCode,
    error: scheduleError,
    loading: scheduleLoading,
  } = useHandleSchedule(id, onSchedule);
  useEffect(() => {
    if (scheduleError) messageApi?.error(scheduleError);
  }, [messageApi, scheduleError]);
  useEffect(() => {
    if (scheduleCode === 200) {
      messageApi?.success(LanguageText.operationSuccess);
      setTimestamp(new Date().getTime());
    }
  }, [LanguageText.operationSuccess, messageApi, scheduleCode, setTimestamp]);

  return (
    <Button
      type="link"
      loading={scheduleLoading}
      onClick={() => fetchSchedule?.()}
    >
      {onSchedule
        ? LanguageText.stopScheduleLabel
        : LanguageText.runScheduleLabel}
    </Button>
  );
};
