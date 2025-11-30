/**
 * ماژول Auth - مدیریت احراز هویت
 */

"use client";

import { useState, useEffect } from "react";
import { LoginForm } from "./components/LoginForm";
import { OTPForm } from "./components/OTPForm";
import { useAuthStore } from "@/stores/auth-store";
import { useRouter } from "next/navigation";

export function AuthModule() {
  const [phone, setPhone] = useState("");
  const [step, setStep] = useState<"login" | "otp">("login");
  const { isAuthenticated, initialize } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    initialize();
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router, initialize]);

  const handleOTPSent = (phoneNumber: string) => {
    setPhone(phoneNumber);
    setStep("otp");
  };

  const handleBack = () => {
    setStep("login");
    setPhone("");
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        {step === "login" ? (
          <LoginForm onOTPSent={handleOTPSent} />
        ) : (
          <OTPForm phone={phone} onBack={handleBack} />
        )}
      </div>
    </div>
  );
}

