/**
 * توابع عمومی fetch با خطایابی و مدیریت توکن
 */

import { getToken } from "./cookies";
import { API_ROUTES } from "./api-routes";

export interface FetchOptions extends RequestInit {
  requireAuth?: boolean;
}

export interface ApiError {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
}

/**
 * تابع اصلی fetch با مدیریت خطا و توکن
 */
export async function fetcher<T>(
  url: string,
  options: FetchOptions = {}
): Promise<T> {
  const { requireAuth = false, headers = {}, ...restOptions } = options;

  // اضافه کردن توکن در صورت نیاز
  const authHeaders: HeadersInit = {};
  if (requireAuth) {
    const token = getToken();
    if (!token) {
      throw new Error("احراز هویت لازم است");
    }
    authHeaders.Authorization = `Bearer ${token}`;
  }

  // ترکیب headers
  const mergedHeaders: HeadersInit = {
    "Content-Type": "application/json",
    ...authHeaders,
    ...headers,
  };

  try {
    const response = await fetch(url, {
      ...restOptions,
      headers: mergedHeaders,
    });

    // بررسی وضعیت پاسخ
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const error: ApiError = {
        message: errorData.message || "خطایی رخ داد",
        status: response.status,
        errors: errorData.errors,
      };
      throw error;
    }

    // در صورت عدم وجود محتوا
    if (response.status === 204) {
      return {} as T;
    }

    return await response.json();
  } catch (error) {
    // مدیریت خطاهای شبکه
    if (error instanceof TypeError && error.message === "Failed to fetch") {
      throw new Error("خطا در اتصال به سرور");
    }

    // پرتاب خطای API
    if (error && typeof error === "object" && "message" in error) {
      throw error;
    }

    // خطای پیش‌فرض
    throw new Error("خطای غیرمنتظره رخ داد");
  }
}

/**
 * GET request
 */
export async function get<T>(url: string, options?: FetchOptions): Promise<T> {
  return fetcher<T>(url, { ...options, method: "GET" });
}

/**
 * POST request
 */
export async function post<T>(
  url: string,
  data?: unknown,
  options?: FetchOptions
): Promise<T> {
  return fetcher<T>(url, {
    ...options,
    method: "POST",
    body: data ? JSON.stringify(data) : undefined,
  });
}

/**
 * PUT request
 */
export async function put<T>(
  url: string,
  data?: unknown,
  options?: FetchOptions
): Promise<T> {
  return fetcher<T>(url, {
    ...options,
    method: "PUT",
    body: data ? JSON.stringify(data) : undefined,
  });
}

/**
 * PATCH request
 */
export async function patch<T>(
  url: string,
  data?: unknown,
  options?: FetchOptions
): Promise<T> {
  return fetcher<T>(url, {
    ...options,
    method: "PATCH",
    body: data ? JSON.stringify(data) : undefined,
  });
}

/**
 * DELETE request
 */
export async function del<T>(url: string, options?: FetchOptions): Promise<T> {
  return fetcher<T>(url, { ...options, method: "DELETE" });
}

/**
 * مدیریت خطا و نمایش پیام مناسب
 */
export function handleError(error: unknown): string {
  if (error && typeof error === "object" && "message" in error) {
    const apiError = error as ApiError;
    return apiError.message || "خطایی رخ داد";
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "خطای غیرمنتظره رخ داد";
}

