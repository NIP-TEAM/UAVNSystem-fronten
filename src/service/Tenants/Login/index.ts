import { useHttp } from "@/hooks";
import { UserProtocol } from "@/store";

export interface LoginInfo {
  password: string;
  email: string;
}

export const useLogin = (data: Partial<LoginInfo>) =>
  useHttp<UserProtocol>({
    url: "/tenants/sessions",
    method: "post",
    data,
  });

export const useLogout = () =>
  useHttp({
    url: "/tenants/logout",
    method: "get",
  });
