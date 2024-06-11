import { DashboardDataType, useGetDashboard } from "@/service";
import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
} from "react";

const DashboardGlobalContext = createContext<{
  dashboardData: DashboardDataType;
  refreshDashboardData?: () => void;
  dashboardLoading: boolean;
}>({
  dashboardData: {} as DashboardDataType,
  dashboardLoading: false,
});

export const DashboardGlobalProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  // get dashboardData
  const {
    fetchData: fetchDashboard,
    code: dashboardCode,
    data: dashboardDataData,
    loading: dashboardLoading,
  } = useGetDashboard();
  const dashboardData = useMemo<DashboardDataType>(() => {
    if (dashboardCode === 200 && dashboardDataData?.data)
      return dashboardDataData.data;
    return {} as DashboardDataType;
  }, [dashboardCode, dashboardDataData?.data]);
  useEffect(() => {
    fetchDashboard?.();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DashboardGlobalContext.Provider
      value={{
        dashboardData,
        dashboardLoading,
        refreshDashboardData: fetchDashboard,
      }}
    >
      {children}
    </DashboardGlobalContext.Provider>
  );
};

export const useDashboardGlobalContext = () =>
  useContext(DashboardGlobalContext);
