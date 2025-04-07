import Cookies from "js-cookie";

/**
 * 쿠키에 특정 값을 설정하는 함수
 * @param name - 쿠키 키 이름
 * @param value - 저장할 값
 * @param days - 만료일(일 단위)
 */
export const setCookie = (name: string, value: string, days: number) => {
  Cookies.set(name, value, { expires: days });
};
