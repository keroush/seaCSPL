/**
 * توابع کمکی و utility functions
 */

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * ترکیب کلاس‌های Tailwind با مدیریت تداخل
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * فرمت کردن تاریخ به فارسی
 */
export function formatDate(date: Date | string, locale: string = "fa-IR"): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(dateObj);
}

/**
 * فرمت کردن عدد به فارسی
 */
export function formatNumber(num: number, locale: string = "fa-IR"): string {
  return new Intl.NumberFormat(locale).format(num);
}

/**
 * فرمت کردن مبلغ به ریال
 */
export function formatCurrency(amount: number, locale: string = "fa-IR"): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "IRR",
    minimumFractionDigits: 0,
  }).format(amount);
}

/**
 * کوتاه کردن متن با ellipsis
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}

/**
 * اعتبارسنجی شماره تلفن ایرانی
 */
export function isValidIranianPhone(phone: string): boolean {
  const phoneRegex = /^09\d{9}$/;
  return phoneRegex.test(phone.replace(/\s/g, ""));
}

/**
 * اعتبارسنجی ایمیل
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * تولید کد OTP تصادفی
 */
export function generateOTP(length: number = 6): string {
  const digits = "0123456789";
  let otp = "";
  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }
  return otp;
}

/**
 * تاخیر (delay) برای async functions
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

