declare global {
  type ApiResponse<T = any> = import("@/types/api").ApiResponse<T>;
  type BaseQueryParams = import("@/types/api").BaseQueryParams;
  type PageResult<T> = import("@/types/api").PageResult<T>;
  type OptionItem = import("@/types/api").OptionItem;
  type ExcelResult = import("@/types/api").ExcelResult;
}

export {};
