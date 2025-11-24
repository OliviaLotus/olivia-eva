import type { UserInfo } from '@/types/api/user'
import { defineStore } from 'pinia'
import { store } from '@/store'

export const useUserStore = defineStore('user', () => {
  // 用户信息
  const userInfo = ref<UserInfo>({} as UserInfo)
  return { userInfo }
})

export function useUserStoreHook() {
  return useUserStore(store)
}
