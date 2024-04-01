import { useHttp } from "@/hooks";

interface VerifyCode {
  email: string;
}

export const useVerifyCode = (data: Partial<VerifyCode>) =>
  useHttp<VerifyCode>({
    url: "/verify-code/send",
    method: "post",
    data,
  });
