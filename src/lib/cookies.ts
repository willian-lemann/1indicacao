import { destroyCookie, parseCookies, setCookie } from "nookies";

export function addCookie(context = undefined, key: string, value: string) {
  setCookie(context, key, value);
}

export function removeCookie(context = undefined, key: string) {
  destroyCookie(context, key);
}

export function getCookie(context = undefined, key: string) {
 return parseCookies(context, key);
}
