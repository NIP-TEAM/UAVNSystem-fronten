import { useHttp } from "@/hooks";
import { UserInfo } from "@/store";
import { NetworkDataType } from "../NetworkAbout/Network";

export interface DashboardDataType {
  countData: DataOverviewType;
  creators: UserInfo[];
  networkStructures: NetworkDataType[];
}

interface DataOverviewType {
  uavCount: number;
  networkCount: number;
  userInfoCount: number;
  protocolCount: number;
  emailCount: number;
  contactCount: number;
}

export const useGetDashboard = () =>
  useHttp<DashboardDataType>({
    url: "/dashboard",
    method: "get",
  });
