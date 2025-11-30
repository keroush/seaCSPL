/**
 * Root Layout برای Next.js App Router
 */

import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import { MainLayout } from "@/components/layout/main-layout";

const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-vazirmatn",
  display: "swap",
});

export const metadata: Metadata = {
  title: "شرکت حمل و نقل دریایی",
  description: "ارائه خدمات حمل و نقل دریایی با کیفیت و قابل اعتماد",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" className={vazirmatn.variable}>
      <body className={vazirmatn.className}>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}

