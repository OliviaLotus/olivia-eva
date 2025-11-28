/** API 响应结构 */
export interface ApiResponse<T = any> {
  /** 响应码 */
  code: string
  /** 响应数据 */
  data: T
  /** 响应消息 */
  msg: string
}
