// utils/getCookie.ts
import Cookies from "js-cookie";

/**
 * 쿠키에서 특정 이름(name)의 값을 가져오는 함수
 * @param name - 쿠키 키 이름
 * @returns string | undefined
 */
export const getCookie = (name: string): string | undefined => {
  return Cookies.get(name); // js-cookie 사용
};
