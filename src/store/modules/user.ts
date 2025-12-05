import type { UserInfo } from "@/types/api/user";
import { defineStore } from "pinia";
import { store } from "@/store";
import { AuthStorage } from "@/utils/auth";
import UserAPI from "@/api/system/user";
import AuthAPI from "@/api/auth";

export const useUserStore = defineStore("user", () => {
  // 用户信息
  const userInfo = ref<UserInfo>({} as UserInfo);
  // 记住我状态
  const rememberMe = ref(AuthStorage.getRememberMe());
  // 刷新 token 的单飞机制，避免多个并发请求时重复刷新
  let refreshPromise: Promise<void> | null = null;

  /**
   * 刷新 token（单飞）。
   *
   * 多个并发请求遇到 token 过期时，共享同一次 refresh 请求。
   */
  function refreshTokenOnce() {
    if (refreshPromise) return refreshPromise;

    refreshPromise = refreshToken().finally(() => {
      refreshPromise = null;
    });

    return refreshPromise;
  }

  /**
   * 刷新 token
   */
  function refreshToken() {
    const refreshToken = AuthStorage.getRefreshToken();

    if (!refreshToken) {
      return Promise.reject(new Error("没有有效的刷新令牌"));
    }

    return new Promise<void>((resolve, reject) => {
      AuthAPI.fetchRefreshToken(refreshToken)
        .then((data) => {
          const { accessToken, refreshToken: newRefreshToken } = data;
          // 更新令牌，保持当前"记住我"状态
          AuthStorage.setTokens(accessToken, newRefreshToken, AuthStorage.getRememberMe());
          resolve();
        })
        .catch((error) => {
          console.log(" refreshToken  刷新失败", error);
          reject(error);
        });
    });
  }

  function getUserInfo() {
    return new Promise<UserInfo>((resolve, reject) => {
      UserAPI.getInfo()
        .then((data) => {
          if (!data) {
            reject("Verification failed, please Login again.");
            return;
          }
          Object.assign(userInfo.value, { ...data });
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  /**
   * 重置所有系统状态
   * 统一处理所有清理工作，包括用户凭证、路由、缓存等
   */
  function resetAllState() {
    // 1. 重置用户状态
    resetUserState();

    // 2. 重置其他模块状态
    // 重置路由
    usePermissionStoreHook().resetRouter();
    // 清除字典缓存
    useDictStoreHook().clearDictCache();
    // 清除标签视图
    useTagsViewStore().delAllViews();

    // 3. 清理 WebSocket 连接
    cleanupWebSocket();
    console.log("[UserStore] WebSocket connections cleaned up");

    return Promise.resolve();
  }
  return {
    userInfo,
    rememberMe,
    isLoggedIn: () => !!AuthStorage.getAccessToken(),
    getUserInfo,
    resetAllState,
    refreshTokenOnce,
  };
});

export function useUserStoreHook() {
  return useUserStore(store);
}
