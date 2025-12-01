/**
 * 最近访问菜单项
 */
export interface RecentMenuItem {
  path: string;
  title: string;
  icon?: string;
  visitedAt: number;
}

const STORAGE_KEY = "recent_menus";
const MAX_COUNT = 8;

// 全局状态
const recentMenus = ref<RecentMenuItem[]>([]);

/**
 * 保存到 localStorage
 */
function saveToStorage(menus: RecentMenuItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(menus));
}

/**
 * 添加最近访问记录（全局方法，供路由守卫调用）
 */
export function addRecentMenu(path: string, title: string, icon?: string) {
  if (!path || !title) return;

  // 过滤掉不需要记录的路径
  const excludePaths = ["/dashboard", "/redirect", "/404", "/401", "/login", "/"];
  if (excludePaths.some((p) => path === p || path.startsWith(p + "/"))) return;

  // 移除已存在的相同路径
  const filtered = recentMenus.value.filter((item) => item.path !== path);

  // 添加到开头
  const newItem: RecentMenuItem = {
    path,
    title,
    icon,
    visitedAt: Date.now(),
  };

  recentMenus.value = [newItem, ...filtered].slice(0, MAX_COUNT);
  saveToStorage(recentMenus.value);
}
