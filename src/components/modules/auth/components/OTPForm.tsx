/**
 * کامپوننت فرم تأیید OTP
 */

"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { post, handleError } from "@/lib/fetcher";
import { API_ROUTES } from "@/lib/api-routes";
import { useAuthStore } from "@/stores/auth-store";
import { useRouter } from "next/navigation";

interface OTPFormProps {
  phone: string;
  onBack: () => void;
}

export function OTPForm({ phone, onBack }: OTPFormProps) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(120);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { setAuth } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError("");

    // Focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    const newOtp = [...otp];
    for (let i = 0; i < pastedData.length; i++) {
      if (i < 6) {
        newOtp[i] = pastedData[i];
      }
    }
    setOtp(newOtp);
    inputRefs.current[Math.min(pastedData.length, 5)]?.focus();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const otpCode = otp.join("");
    if (otpCode.length !== 6) {
      setError("لطفا کد ۶ رقمی را کامل وارد کنید");
      return;
    }

    setIsLoading(true);
    try {
      const response = await post<{ user: any; token: string }>(
        API_ROUTES.auth.verifyOTP,
        { phone, otp: otpCode }
      );
      
      setAuth(response.user, response.token);
      router.push("/dashboard");
    } catch (err) {
      setError(handleError(err));
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setCountdown(120);
    setError("");
    try {
      await post(API_ROUTES.auth.sendOTP, { phone });
    } catch (err) {
      setError(handleError(err));
    }
  };

  return (
    <Card>
      <CardHeader>
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="mb-2 w-fit"
        >
          <ArrowLeft className="h-4 w-4 ml-2" />
          بازگشت
        </Button>
        <CardTitle className="text-2xl">تأیید شماره تلفن</CardTitle>
        <CardDescription>
          کد ارسال شده به شماره {phone} را وارد کنید
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-3 text-center">
              کد تأیید ۶ رقمی
            </label>
            <div className="flex gap-2 justify-center" onPaste={handlePaste}>
              {otp.map((digit, index) => (
                <Input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-12 text-center text-lg font-semibold"
                  disabled={isLoading}
                />
              ))}
            </div>
          </div>

          {error && (
            <div className="text-sm text-error bg-red-50 p-3 rounded-md">
              {error}
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "در حال بررسی..." : "تأیید و ورود"}
            {!isLoading && <CheckCircle className="h-4 w-4 mr-2" />}
          </Button>

          <div className="text-center">
            {countdown > 0 ? (
              <p className="text-sm text-muted-foreground">
                ارسال مجدد کد در {Math.floor(countdown / 60)}:{(countdown % 60).toString().padStart(2, "0")}
              </p>
            ) : (
              <Button
                type="button"
                variant="link"
                onClick={handleResend}
                className="text-sm"
              >
                ارسال مجدد کد
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

