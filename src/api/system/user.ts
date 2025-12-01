import type { UserInfo } from "@/types/api/user";
import request from "@/utils/request";

const USER_BASE_URL = "/api/v1/users";

const UserAPI = {
  getInfo() {
    return request<any, UserInfo>({
      url: `${USER_BASE_URL}/me`,
      method: "get",
    });
  },
};

export default UserAPI;
