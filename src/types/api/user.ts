/** 登录用户信息 */
export interface UserInfo {
  /** 用户ID */
  userId?: string
  /** 用户名 */
  username?: string
  /** 用户昵称 */
  nickname?: string
  /** 头像URL */
  avatar?: string
  /** 租户切换权限（true 可切换租户） */
  canSwitchTenant?: boolean
  /** 角色集合 */
  roles: string[]
  /** 权限集合 */
  perms: string[]
}
