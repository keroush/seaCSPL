/**
 * ماژول Dashboard - پنل کاربری
 */

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User, Package, LogOut } from "lucide-react";
import { useAuthStore } from "@/stores/auth-store";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { OrdersList } from "./components/OrdersList";
import { get, handleError } from "@/lib/fetcher";
import { API_ROUTES } from "@/lib/api-routes";

interface Order {
  id: string;
  trackingNumber: string;
  status: "pending" | "in_transit" | "delivered" | "cancelled";
  origin: string;
  destination: string;
  createdAt: string;
}

export function DashboardModule() {
  const { user, isAuthenticated, logout, initialize } = useAuthStore();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    initialize();
    if (!isAuthenticated) {
      router.push("/auth/login");
      return;
    }

    // بارگذاری سفارش‌ها
    loadOrders();
  }, [isAuthenticated, router, initialize]);

  const loadOrders = async () => {
    try {
      const data = await get<{ orders: Order[] }>(API_ROUTES.orders.list, {
        requireAuth: true,
      });
      setOrders(data.orders || []);
    } catch (error) {
      console.error("خطا در بارگذاری سفارش‌ها:", handleError(error));
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              پنل کاربری
            </h1>
            <p className="text-muted-foreground">
              خوش آمدید، {user.name}
            </p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="h-4 w-4 ml-2" />
            خروج
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <User className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>اطلاعات کاربری</CardTitle>
            <CardDescription>مشاهده و ویرایش پروفایل</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-muted-foreground">نام:</span>{" "}
                <span className="font-medium">{user.name}</span>
              </div>
              <div>
                <span className="text-muted-foreground">ایمیل:</span>{" "}
                <span className="font-medium">{user.email}</span>
              </div>
              <div>
                <span className="text-muted-foreground">تلفن:</span>{" "}
                <span className="font-medium">{user.phone}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
              <Package className="h-6 w-6 text-secondary" />
            </div>
            <CardTitle>سفارش‌های من</CardTitle>
            <CardDescription>تعداد: {orders.length}</CardDescription>
          </CardHeader>
        </Card>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          سفارش‌های اخیر
        </h2>
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">در حال بارگذاری...</p>
          </div>
        ) : (
          <OrdersList orders={orders} />
        )}
      </div>
    </div>
  );
}

