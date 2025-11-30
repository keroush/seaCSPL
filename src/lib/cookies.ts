/**
 * مدیریت کوکی‌ها برای user و token
 */

import Cookies from "js-cookie";

const TOKEN_KEY = "auth_token";
const USER_KEY = "user_data";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "user" | "admin";
}

/**
 * ذخیره توکن احراز هویت
 */
export function setToken(token: string): void {
  Cookies.set(TOKEN_KEY, token, {
    expires: 7, // 7 روز
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
}

/**
 * دریافت توکن احراز هویت
 */
export function getToken(): string | undefined {
  return Cookies.get(TOKEN_KEY);
}

/**
 * حذف توکن
 */
export function removeToken(): void {
  Cookies.remove(TOKEN_KEY);
}

/**
 * ذخیره اطلاعات کاربر
 */
export function setUser(user: User): void {
  Cookies.set(USER_KEY, JSON.stringify(user), {
    expires: 7,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
}

/**
 * دریافت اطلاعات کاربر
 */
export function getUser(): User | null {
  const userData = Cookies.get(USER_KEY);
  if (!userData) return null;
  
  try {
    return JSON.parse(userData) as User;
  } catch {
    return null;
  }
}

/**
 * حذف اطلاعات کاربر
 */
export function removeUser(): void {
  Cookies.remove(USER_KEY);
}

/**
 * بررسی وجود احراز هویت
 */
export function isAuthenticated(): boolean {
  return !!getToken() && !!getUser();
}

/**
 * خروج از سیستم (حذف تمام داده‌ها)
 */
export function logout(): void {
  removeToken();
  removeUser();
}

