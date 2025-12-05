import { useDictSync } from "./useDictSync";
import { useOnlineCount } from "./useOnlineCount";

/**
 * 初始化所有 WebSocket 服务
 *
 * 应在应用启动时调用，统一初始化所有 WebSocket 连接
 *
 * ```
 */
export function setupWebSocket() {
  // 初始化字典同步服务
  const dictSync = useDictSync();
  dictSync.initialize();

  // 初始化在线用户统计服务
  const onlineCount = useOnlineCount();
  onlineCount.initialize();
}
