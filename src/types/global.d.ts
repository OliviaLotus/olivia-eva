declare global {
  type ApiResponse<T = any> = import('@/types/api').ApiResponse<T>
}

export {}
