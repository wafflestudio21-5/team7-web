import { Cookies } from "react-cookie";

const cookies = new Cookies();

/** Key, Value를 받아 Cookie 생성 후 저장
 * @param {string} name
 * @param {string} value
 */
export const setCookie = (name: string, value: string) => {
  return cookies.set(name, value, { maxAge: 60 * 60 * 3, path: "/" });
};

/** Key를 받아 Value를 반환
 * @param {string} name
 * @returns {string}
 */
export const getCookie = (name: string) => {
  return cookies.get(name);
};

/** Key를 받아 쿠키를 삭제
 * @param {string} name
 */
export const removeCookie = (name: string) => {
  return cookies.remove(name);
};
