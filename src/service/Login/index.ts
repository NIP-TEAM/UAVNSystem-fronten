import { useHttp } from "../../hooks";
import { UserProtocol } from "../../store";

export interface LoginInfo {
  password: string;
  userName: string;
}

export const useLogin = (data: LoginInfo) =>
  useHttp<UserProtocol>({
    url: "/tenants/sessions",
    method: "post",
    data,
  });
