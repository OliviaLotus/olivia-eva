import request from "@/utils/request";
import type { LoginRequest, LoginResponse, CaptchaInfo } from "@/types/api/auth";

const AUTH_BASE_URL = "/api/v1/auth";

const AuthAPI = {
  /** 切换租户(平台用户) - 返回新的 token */
  switchTenant(tenantId: number) {
    return request<any, LoginResponse>({
      url: `${AUTH_BASE_URL}/switch-tenant`,
      method: "post",
      params: { tenantId },
    });
  },
};

export default AuthAPI;
