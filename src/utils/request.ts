import type { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import axios from "axios";
import qs from "qs";
import { AuthStorage } from "@/utils/auth";
import { ApiCodeEnum } from "@/enums/api";

const http = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 50000,
  headers: { "Content-Type": "application/json;charset=utf-8" },
  paramsSerializer: (params) => qs.stringify(params, { arrayFormat: "repeat" }),
});
// 请求拦截器
http.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = AuthStorage.getAccessToken();

    if (config.headers.Authorization === "no-auth") {
      delete config.headers.Authorization;
    } else if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);
// 响应拦截器
http.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    // 二进制数据直接返回
    const { responseType } = response.config;
    if (responseType === "blob" || responseType === "arraybuffer") {
      return response;
    }

    const { code, data, msg } = response.data;

    if (code === ApiCodeEnum.SUCCESS) {
      return data;
    }
    return rejectWithMessage(msg, "系统出错");
  },
  async (error) => {
    const { config, response } = error;
    if (!response) {
      ElMessage.error("网络连接失败");
      return Promise.reject(error);
    }
  }
);

function rejectWithMessage(msg: string | undefined, fallback: string): Promise<never> {
  const message = msg || fallback;
  ElMessage.error(message);
  return Promise.reject(new Error(message));
}

export default http;
