/**
 * کامپوننت Tracking برای ردیابی محموله
 */

"use client";

import { useState } from "react";
import { Search, Package } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Tracking() {
  const [trackingNumber, setTrackingNumber] = useState("");

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingNumber.trim()) {
      window.location.href = `/tracking?number=${trackingNumber}`;
    }
  };

  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-xl">
            <CardHeader className="text-center">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Package className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl md:text-3xl">
                ردیابی محموله
              </CardTitle>
              <CardDescription className="text-base">
                شماره ردیابی خود را وارد کنید تا از وضعیت محموله مطلع شوید
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleTrack} className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="شماره ردیابی (مثال: SH123456789)"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit" size="lg">
                    <Search className="h-5 w-5 ml-2" />
                    ردیابی
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground text-center">
                  شماره ردیابی را از ایمیل یا پیامک خود دریافت کرده‌اید
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

