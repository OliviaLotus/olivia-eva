import NProgress from '@/plugins/nprogress'
import { useUserStore } from '@/store'
import { usePermissionStore } from '@/store/modules/permission'
import router from '..'

export function setupPermissionGuard() {
  const whiteList = ['/login']

  router.beforeEach(async (to, _from, next) => {
    NProgress.start()
    try {
      const isLoggedIn = useUserStore().isLoggedIn()
      // 未登录处理
      if (!isLoggedIn) {
        if (whiteList.includes(to.path)) {
          next()
        }
        else {
          next(`/login?redirect=${encodeURIComponent(to.fullPath)}`)
          NProgress.done()
        }
        return
      }

      // 已登录访问登录页，重定向到首页
      if (to.path === '/login') {
        next({ path: '/' })
        return
      }

      const permissionStore = usePermissionStore()
      const userStore = useUserStore()

      // 动态路由生成
      if (!permissionStore.isRouteGenerated) {
        if (!userStore.userInfo?.roles?.length) {
          await userStore.getUserInfo()
        }
      }
    }
    catch (error) {
      console.error('Route guard error:', error)
      await useUserStore().resetAllState()
      next('/login')
      NProgress.done()
    }
  })

  router.afterEach((to) => {
    NProgress.done()
    // 记录最近访问
    if (to.meta?.title && to.path) {
      const icon = typeof to.meta.icon === 'string' ? to.meta.icon : undefined
      addRecentMenu(to.path, to.meta.title as string, icon)
    }
  })
}
