import { store } from "@/store";

export const usePermissionStore = defineStore("permission", () => {
  // 动态路由是否已生成
  const isRouteGenerated = ref(false);

  return {
    isRouteGenerated,
  };
});

export function usePermissionStoreHook() {
  return usePermissionStore(store);
}
