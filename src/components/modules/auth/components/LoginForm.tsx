/**
 * کامپوننت فرم ورود با OTP
 */

"use client";

import { useState } from "react";
import { Phone, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { isValidIranianPhone } from "@/lib/utils";
import { post, handleError } from "@/lib/fetcher";
import { API_ROUTES } from "@/lib/api-routes";

interface LoginFormProps {
  onOTPSent: (phone: string) => void;
}

export function LoginForm({ onOTPSent }: LoginFormProps) {
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!phone.trim()) {
      setError("لطفا شماره تلفن خود را وارد کنید");
      return;
    }

    if (!isValidIranianPhone(phone)) {
      setError("شماره تلفن معتبر نیست (فرمت: 09123456789)");
      return;
    }

    setIsLoading(true);
    try {
      await post(API_ROUTES.auth.sendOTP, { phone: phone.trim() });
      onOTPSent(phone.trim());
    } catch (err) {
      setError(handleError(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">ورود / ثبت نام</CardTitle>
        <CardDescription>
          برای ادامه، شماره تلفن همراه خود را وارد کنید
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-2">
              شماره تلفن همراه
            </label>
            <div className="relative">
              <Phone className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="phone"
                type="tel"
                placeholder="09123456789"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="pr-10"
                disabled={isLoading}
              />
            </div>
          </div>

          {error && (
            <div className="text-sm text-error bg-red-50 p-3 rounded-md">
              {error}
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "در حال ارسال..." : "ارسال کد تأیید"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

