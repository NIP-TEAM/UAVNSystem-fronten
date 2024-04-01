import { LoginInfo } from "@/service";
import { useHttp } from "@/hooks";

export interface RegisterInfo extends LoginInfo {
  verifyCode: string;
  name: string;
}

export const useRegister = (data: Partial<RegisterInfo>) =>
  useHttp<RegisterInfo>({
    url: "/tenants/register",
    method: "post",
    data,
  });
