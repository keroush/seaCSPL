/**
 * تنظیمات محیطی پروژه
 */

export const env = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api",
  appUrl: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  isDevelopment: process.env.NODE_ENV === "development",
  isProduction: process.env.NODE_ENV === "production",
} as const;

