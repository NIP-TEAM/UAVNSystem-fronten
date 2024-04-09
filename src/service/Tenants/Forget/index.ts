import { useHttp } from "@/hooks";

export interface ForgetInfo {
    email: string,
    verifyCode: string
}

export const useForget = (data: Partial<ForgetInfo>) => useHttp({
    url: "/tenants/forget",
    method: "post",
    data,
  });