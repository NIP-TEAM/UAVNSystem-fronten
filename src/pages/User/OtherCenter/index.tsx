import { AppContext } from "@/App";
import { BasicCard } from "@/components";
import { useLanguageContext } from "@/hooks";
import { useGetUser } from "@/service";
import { UserInfo, userAtom } from "@/store";
import { Spin, Typography } from "antd";
import { FC, useContext, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router";
import { InfoShowcase } from "../components";
import { useAtomValue } from "jotai";

export interface OtherCenterProp {}

export const OtherCenter: FC<OtherCenterProp> = () => {
  const navigate = useNavigate();
  const { messageApi } = useContext(AppContext);
  const { LanguageText } = useLanguageContext<"User">();
  const {
    userInfo: { id: currentId },
  } = useAtomValue(userAtom);
  const { id = "" } = useParams();

  //   getInfo
  const {
    fetchData: fetchUser,
    code: userCode,
    error: userError,
    loading: userLoading,
    data: userDataData,
  } = useGetUser(+id);
  useEffect(() => {
    if (userError) messageApi?.error(userError);
  }, [userError, messageApi]);
  useEffect(() => {
    if (+id === currentId) {
      navigate("/user");
      return;
    }
    fetchUser?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const userInfo = useMemo<UserInfo>(() => {
    if (userCode === 200 && userDataData?.data) return userDataData.data;
    return {} as UserInfo;
  }, [userDataData?.data, userCode]);

  return (
    <BasicCard>
      <Typography.Title level={4}>{LanguageText.userTitle}</Typography.Title>
      <Spin spinning={userLoading}>
        <InfoShowcase {...{ userInfo }} />
      </Spin>
    </BasicCard>
  );
};
