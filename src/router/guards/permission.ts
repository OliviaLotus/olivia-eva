import NProgress from "@/plugins/nprogress";
import { useUserStore } from "@/store";
import { usePermissionStore } from "@/store/modules/permission";
import router from "..";
import { isTenantEnabled } from "@/utils/tenant";
import { useTenantStoreHook } from "@/store/modules/tenant";
import { addRecentMenu } from "@/composables/useRecentMenus";

export function setupPermissionGuard() {
  const whiteList = ["/login"];

  router.beforeEach(async (to, _from, next) => {
    NProgress.start();
    try {
      const isLoggedIn = useUserStore().isLoggedIn();
      // 未登录处理
      if (!isLoggedIn) {
        if (whiteList.includes(to.path)) {
          next();
        } else {
          next(`/login?redirect=${encodeURIComponent(to.fullPath)}`);
          NProgress.done();
        }
        return;
      }

      // 已登录访问登录页，重定向到首页
      if (to.path === "/login") {
        next({ path: "/" });
        return;
      }

      const permissionStore = usePermissionStore();
      const userStore = useUserStore();

      // 动态路由生成
      if (!permissionStore.isRouteGenerated) {
        if (!userStore.userInfo?.roles?.length) {
          await userStore.getUserInfo();
        }

        // 加载用户租户列表（VITE_APP_TENANT_ENABLED=true 时生效）
        await initTenantContext();
      }
    } catch (error) {
      console.error("Route guard error:", error);
      await useUserStore().resetAllState();
      next("/login");
      NProgress.done();
    }
  });

  router.afterEach((to) => {
    NProgress.done();

    // 记录最近访问
    if (to.meta?.title && to.path) {
      const icon = typeof to.meta.icon === "string" ? to.meta.icon : undefined;
      addRecentMenu(to.path, to.meta.title as string, icon);
    }
  });
}

// 多租户支持（可选）
/** 初始化多租户上下文，未启用或失败时静默跳过 */
async function initTenantContext(): Promise<void> {
  // 多租户关闭时不初始化租户上下文
  if (!isTenantEnabled()) return;

  try {
    await useTenantStoreHook().loadTenant();
  } catch {
    // 静默失败，不影响主流程
  }
}
