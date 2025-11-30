/**
 * مسیرهای API پروژه
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export const API_ROUTES = {
  // احراز هویت
  auth: {
    sendOTP: `${API_BASE_URL}/auth/send-otp`,
    verifyOTP: `${API_BASE_URL}/auth/verify-otp`,
    logout: `${API_BASE_URL}/auth/logout`,
    refresh: `${API_BASE_URL}/auth/refresh`,
  },
  
  // کاربران
  users: {
    profile: `${API_BASE_URL}/users/profile`,
    updateProfile: `${API_BASE_URL}/users/profile`,
  },
  
  // خدمات حمل و نقل
  services: {
    list: `${API_BASE_URL}/services`,
    detail: (id: string) => `${API_BASE_URL}/services/${id}`,
  },
  
  // ردیابی محموله
  tracking: {
    track: (trackingNumber: string) => `${API_BASE_URL}/tracking/${trackingNumber}`,
    history: `${API_BASE_URL}/tracking/history`,
  },
  
  // سفارش‌ها
  orders: {
    list: `${API_BASE_URL}/orders`,
    create: `${API_BASE_URL}/orders`,
    detail: (id: string) => `${API_BASE_URL}/orders/${id}`,
    update: (id: string) => `${API_BASE_URL}/orders/${id}`,
    cancel: (id: string) => `${API_BASE_URL}/orders/${id}/cancel`,
  },
  
  // کشتی‌ها
  vessels: {
    list: `${API_BASE_URL}/vessels`,
    detail: (id: string) => `${API_BASE_URL}/vessels/${id}`,
    schedule: `${API_BASE_URL}/vessels/schedule`,
  },
  
  // بنادر
  ports: {
    list: `${API_BASE_URL}/ports`,
    detail: (id: string) => `${API_BASE_URL}/ports/${id}`,
  },
  
  // تماس با ما
  contact: {
    submit: `${API_BASE_URL}/contact`,
  },
} as const;

