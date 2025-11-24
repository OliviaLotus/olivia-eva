import type { App } from 'vue'

import type { RouteRecordRaw } from 'vue-router'
import {
  createRouter,
  createWebHashHistory,

} from 'vue-router'
// 静态路由
export const constantRoutes: RouteRecordRaw[] = []

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
  // 刷新时，滚动条位置还原
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

export function setupRouter(app: App<Element>) {
  app.use(router)
}

export default router
