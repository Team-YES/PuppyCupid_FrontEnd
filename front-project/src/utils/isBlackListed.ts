import { UserInfo } from "@/reducers/userSlice";

export const isBlacklistedUser = (user: UserInfo | null): boolean => {
  return user?.role === "blacklist";
};

// 블랙리스트면 alert
export const checkBlacklistAndBlock = (
  user: UserInfo | null,
  alertMsg = "접근이 제한되어 이용하실 수 없습니다."
): boolean => {
  if (user?.role === "blacklist") {
    alert(alertMsg);
    return true;
  }
  return false;
};
