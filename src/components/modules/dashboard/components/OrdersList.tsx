/**
 * کامپوننت لیست سفارش‌ها
 */

"use client";

import { Package, Calendar, MapPin } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";

interface Order {
  id: string;
  trackingNumber: string;
  status: "pending" | "in_transit" | "delivered" | "cancelled";
  origin: string;
  destination: string;
  createdAt: string;
}

interface OrdersListProps {
  orders: Order[];
}

const statusLabels = {
  pending: "در انتظار",
  in_transit: "در حال حمل",
  delivered: "تحویل شده",
  cancelled: "لغو شده",
};

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  in_transit: "bg-blue-100 text-blue-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

export function OrdersList({ orders }: OrdersListProps) {
  if (orders.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <Package className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">هنوز سفارشی ثبت نشده است</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <Card key={order.id} className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-lg">شماره ردیابی: {order.trackingNumber}</CardTitle>
                <CardDescription className="mt-1">
                  <Calendar className="h-4 w-4 inline ml-1" />
                  {formatDate(order.createdAt)}
                </CardDescription>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[order.status]}`}
              >
                {statusLabels[order.status]}
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{order.origin}</span>
              </div>
              <span>→</span>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{order.destination}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

