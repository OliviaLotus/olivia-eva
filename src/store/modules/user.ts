import type { UserInfo } from '@/types/api/user'
import { defineStore } from 'pinia'
import { store } from '@/store'
import { AuthStorage } from '@/utils/auth'
import UserAPI from '@/api/system/user'

export const useUserStore = defineStore('user', () => {
  // 用户信息
  const userInfo = ref<UserInfo>({} as UserInfo)
  // 记住我状态
  const rememberMe = ref(AuthStorage.getRememberMe())

  function getUserInfo() {
    return new Promise<UserInfo>((resolve,reject) => {
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
    }
  }
  return { userInfo, rememberMe, isLoggedIn: () => !!AuthStorage.getAccessToken() }
})

export function useUserStoreHook() {
  return useUserStore(store)
}
