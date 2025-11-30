/**
 * صفحه مشاهده جزئیات و قیمت‌گذاری
 */

"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { MapPin, Package, Box, Weight, Calculator, ArrowRight, CheckCircle, Info } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// لیست بنادر و شهرها
const ports = [
  { value: "bandar-abbas", label: "بندر عباس" },
  { value: "bushehr", label: "بوشهر" },
  { value: "chabahar", label: "چابهار" },
  { value: "imam-khomeini", label: "بندر امام خمینی" },
  { value: "shahid-rajaee", label: "بندر شهید رجایی" },
  { value: "dubai", label: "دبی" },
  { value: "shanghai", label: "شانگهای" },
  { value: "singapore", label: "سنگاپور" },
  { value: "rotterdam", label: "روتردام" },
  { value: "hamburg", label: "هامبورگ" },
  { value: "los-angeles", label: "لس آنجلس" },
  { value: "new-york", label: "نیویورک" },
];

const productTypes = [
  { value: "general", label: "کالای عمومی", description: "کالاهای عمومی و معمولی که نیاز به شرایط خاص ندارند" },
  { value: "electronics", label: "الکترونیک", description: "کالاهای الکترونیکی که نیاز به بسته‌بندی و حمل و نقل خاص دارند" },
  { value: "textiles", label: "پارچه و منسوجات", description: "پارچه، لباس و محصولات نساجی" },
  { value: "machinery", label: "ماشین‌آلات", description: "ماشین‌آلات صنعتی و تجهیزات سنگین" },
  { value: "food", label: "مواد غذایی", description: "مواد غذایی که نیاز به کانتینر یخچالی دارند" },
  { value: "chemicals", label: "مواد شیمیایی", description: "مواد شیمیایی که نیاز به رعایت استانداردهای ایمنی دارند" },
  { value: "furniture", label: "مبلمان", description: "مبلمان و لوازم خانگی" },
  { value: "other", label: "سایر", description: "سایر انواع کالا" },
];

const containerTypes = [
  { value: "20ft", label: "کانتینر ۲۰ فوت", description: "ظرفیت: حدود 33 متر مکعب، مناسب برای محموله‌های کوچک تا متوسط" },
  { value: "40ft", label: "کانتینر ۴۰ فوت", description: "ظرفیت: حدود 67 متر مکعب، مناسب برای محموله‌های بزرگ" },
  { value: "40ft-hc", label: "کانتینر ۴۰ فوت High Cube", description: "ظرفیت: حدود 76 متر مکعب، ارتفاع بیشتر برای کالاهای بلند" },
  { value: "45ft", label: "کانتینر ۴۵ فوت", description: "ظرفیت: حدود 86 متر مکعب، بزرگترین کانتینر استاندارد" },
  { value: "reefer", label: "کانتینر یخچالی", description: "مجهز به سیستم سرمایش برای کالاهای حساس به دما" },
  { value: "open-top", label: "کانتینر Open Top", description: "سقف باز برای کالاهای با ارتفاع زیاد" },
  { value: "flat-rack", label: "کانتینر Flat Rack", description: "بدون دیواره برای کالاهای بزرگ و سنگین" },
];

function QuoteContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [estimatedPrice, setEstimatedPrice] = useState("");

  const origin = searchParams.get("origin") || "";
  const destination = searchParams.get("destination") || "";
  const productType = searchParams.get("productType") || "";
  const containerType = searchParams.get("containerType") || "";
  const weight = searchParams.get("weight") || "";

  useEffect(() => {
    if (!origin || !destination || !productType || !containerType || !weight) {
      router.push("/");
      return;
    }

    // محاسبه قیمت تقریبی
    let basePrice = 500;
    if (containerType === "20ft") basePrice = 800;
    else if (containerType === "40ft") basePrice = 1200;
    else if (containerType === "40ft-hc") basePrice = 1400;
    else if (containerType === "45ft") basePrice = 1600;
    else if (containerType === "reefer") basePrice = 2000;

    const weightFactor = parseFloat(weight) / 1000;
    const finalPrice = Math.round(basePrice * weightFactor);
    setEstimatedPrice(finalPrice.toLocaleString("fa-IR"));
  }, [origin, destination, productType, containerType, weight, router]);

  // محاسبه قیمت‌های تفکیک شده
  const calculateBreakdown = () => {
    let containerBasePrice = 0;
    if (containerType === "20ft") containerBasePrice = 800;
    else if (containerType === "40ft") containerBasePrice = 1200;
    else if (containerType === "40ft-hc") containerBasePrice = 1400;
    else if (containerType === "45ft") containerBasePrice = 1600;
    else if (containerType === "reefer") containerBasePrice = 2000;
    else if (containerType === "open-top") containerBasePrice = 1500;
    else if (containerType === "flat-rack") containerBasePrice = 1800;

    const weightFactor = parseFloat(weight) / 1000;
    const containerPrice = Math.round(containerBasePrice * weightFactor);
    const shippingPrice = Math.round(containerPrice * 0.6); // 60% هزینه حمل
    const handlingPrice = Math.round(containerPrice * 0.2); // 20% هزینه بارگیری
    const insurancePrice = Math.round(containerPrice * 0.1); // 10% بیمه
    const documentationPrice = Math.round(containerPrice * 0.1); // 10% اسناد

    return {
      container: containerPrice,
      shipping: shippingPrice,
      handling: handlingPrice,
      insurance: insurancePrice,
      documentation: documentationPrice,
      total: containerPrice + shippingPrice + handlingPrice + insurancePrice + documentationPrice,
    };
  };

  const breakdown = calculateBreakdown();

  const getPortLabel = (value: string) => {
    return ports.find(p => p.value === value)?.label || value;
  };

  const getProductTypeInfo = (value: string) => {
    return productTypes.find(p => p.value === value) || { label: value, description: "" };
  };

  const getContainerTypeInfo = (value: string) => {
    return containerTypes.find(c => c.value === value) || { label: value, description: "" };
  };

  if (!origin || !destination || !productType || !containerType || !weight) {
    return null;
  }

  const productInfo = getProductTypeInfo(productType);
  const containerInfo = getContainerTypeInfo(containerType);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            جزئیات محاسبه هزینه
          </h1>
          <p className="text-lg text-muted-foreground">
            بررسی و تأیید اطلاعات محموله شما
          </p>
        </div>

        {/* Total Price Card - Modern Design */}
        <Card className="mb-6 border-2 border-primary/30 shadow-xl bg-gradient-to-br from-primary via-primary-dark to-secondary text-white overflow-hidden relative">
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
          <CardContent className="pt-8 pb-8 relative z-10">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Calculator className="h-6 w-6 text-white/90" />
                <span className="text-sm text-white/80 font-medium">هزینه کل تقریبی</span>
              </div>
              <div className="text-6xl font-bold mb-3 drop-shadow-lg">
                {breakdown.total.toLocaleString("fa-IR")} <span className="text-4xl">ریال</span>
              </div>
              <p className="text-xs text-white/70 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 inline-block">
                * قیمت تقریبی - ممکن است بر اساس شرایط واقعی تغییر کند
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Price Breakdown - Modern Grid with Different Colors */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5 shadow-md hover:shadow-lg transition-all">
            <CardHeader className="pb-2 border-b border-primary/10">
              <CardTitle className="text-sm flex items-center gap-2 text-primary">
                <Box className="h-4 w-4" />
                هزینه کانتینر
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-3">
              <div className="bg-white/50 hover:bg-white/70 transition-colors rounded-lg p-3">
                <div className="text-xl font-bold text-primary mb-1">
                  {breakdown.container.toLocaleString("fa-IR")}
                </div>
                <div className="text-xs text-muted-foreground">ریال</div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-secondary/20 bg-gradient-to-br from-secondary/5 to-accent/5 shadow-md hover:shadow-lg transition-all">
            <CardHeader className="pb-2 border-b border-secondary/10">
              <CardTitle className="text-sm flex items-center gap-2 text-secondary">
                <MapPin className="h-4 w-4" />
                هزینه حمل
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-3">
              <div className="bg-white/50 hover:bg-white/70 transition-colors rounded-lg p-3">
                <div className="text-xl font-bold text-secondary mb-1">
                  {breakdown.shipping.toLocaleString("fa-IR")}
                </div>
                <div className="text-xs text-muted-foreground">ریال</div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-accent/20 bg-gradient-to-br from-accent/5 to-primary/5 shadow-md hover:shadow-lg transition-all">
            <CardHeader className="pb-2 border-b border-accent/10">
              <CardTitle className="text-sm flex items-center gap-2 text-accent">
                <Package className="h-4 w-4" />
                هزینه بارگیری
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-3">
              <div className="bg-white/50 hover:bg-white/70 transition-colors rounded-lg p-3">
                <div className="text-xl font-bold text-accent mb-1">
                  {breakdown.handling.toLocaleString("fa-IR")}
                </div>
                <div className="text-xs text-muted-foreground">ریال</div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-success/20 bg-gradient-to-br from-success/5 to-primary/5 shadow-md hover:shadow-lg transition-all">
            <CardHeader className="pb-2 border-b border-success/10">
              <CardTitle className="text-sm flex items-center gap-2 text-success">
                <CheckCircle className="h-4 w-4" />
                بیمه
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-3">
              <div className="bg-white/50 hover:bg-white/70 transition-colors rounded-lg p-3">
                <div className="text-xl font-bold text-success mb-1">
                  {breakdown.insurance.toLocaleString("fa-IR")}
                </div>
                <div className="text-xs text-muted-foreground">ریال</div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-info/20 bg-gradient-to-br from-info/5 to-secondary/5 shadow-md hover:shadow-lg transition-all">
            <CardHeader className="pb-2 border-b border-info/10">
              <CardTitle className="text-sm flex items-center gap-2 text-info">
                <Info className="h-4 w-4" />
                اسناد و مدارک
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-3">
              <div className="bg-white/50 hover:bg-white/70 transition-colors rounded-lg p-3">
                <div className="text-xl font-bold text-info mb-1">
                  {breakdown.documentation.toLocaleString("fa-IR")}
                </div>
                <div className="text-xs text-muted-foreground">ریال</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Route and Weight Info - Compact Design */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Card className="border-2 border-secondary/20 bg-gradient-to-br from-secondary/5 to-accent/5 shadow-md hover:shadow-lg transition-all">
            <CardHeader className="pb-2 border-b border-secondary/10">
              <CardTitle className="text-sm flex items-center gap-2 text-secondary">
                <MapPin className="h-4 w-4" />
                مسیر حمل و نقل
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-3">
              <div className="flex items-center justify-between gap-3">
                <div className="flex-1 bg-white/50 hover:bg-white/70 transition-colors rounded-lg p-3 text-center">
                  <div className="text-xs text-muted-foreground mb-1">مبدا</div>
                  <div className="text-sm font-semibold text-foreground">{getPortLabel(origin)}</div>
                </div>
                <ArrowRight className="h-5 w-5 text-secondary rotate-180 flex-shrink-0" />
                <div className="flex-1 bg-white/50 hover:bg-white/70 transition-colors rounded-lg p-3 text-center">
                  <div className="text-xs text-muted-foreground mb-1">مقصد</div>
                  <div className="text-sm font-semibold text-foreground">{getPortLabel(destination)}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-accent/20 bg-gradient-to-br from-accent/5 to-primary/5 shadow-md hover:shadow-lg transition-all">
            <CardHeader className="pb-2 border-b border-accent/10">
              <CardTitle className="text-sm flex items-center gap-2 text-accent">
                <Weight className="h-4 w-4" />
                وزن محموله
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-3">
              <div className="bg-white/50 hover:bg-white/70 transition-colors rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-accent mb-1">
                  {parseFloat(weight).toLocaleString("fa-IR")}
                </div>
                <div className="text-xs text-muted-foreground">کیلوگرم</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Product and Container Details - Modern Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5 shadow-md hover:shadow-lg transition-all">
            <CardHeader className="border-b border-primary/10">
              <CardTitle className="flex items-center gap-2 text-primary">
                <Package className="h-5 w-5" />
                نوع محصول
              </CardTitle>
              <CardDescription className="font-medium text-foreground mt-2">{productInfo.label}</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="bg-white/50 hover:bg-white/70 transition-colors rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {productInfo.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-secondary/20 bg-gradient-to-br from-secondary/5 to-primary/5 shadow-md hover:shadow-lg transition-all">
            <CardHeader className="border-b border-secondary/10">
              <CardTitle className="flex items-center gap-2 text-secondary">
                <Box className="h-5 w-5" />
                نوع کانتینر
              </CardTitle>
              <CardDescription className="font-medium text-foreground mt-2">{containerInfo.label}</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="bg-white/50 hover:bg-white/70 transition-colors rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {containerInfo.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Important Notes - Modern Design */}
        <Card className="mb-6 border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5 shadow-md">
          <CardHeader className="border-b border-primary/10">
            <CardTitle className="flex items-center gap-2 text-primary">
              <CheckCircle className="h-5 w-5" />
              نکات مهم
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-white/50 hover:bg-white/70 transition-colors">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-medium text-sm text-foreground mb-1">قیمت تقریبی</div>
                  <div className="text-xs text-muted-foreground">قیمت ارائه شده تقریبی است و ممکن است بر اساس شرایط واقعی تغییر کند</div>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-white/50 hover:bg-white/70 transition-colors">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-medium text-sm text-foreground mb-1">بررسی دقیق</div>
                  <div className="text-xs text-muted-foreground">قیمت نهایی پس از بررسی دقیق محموله و مسیر تعیین می‌شود</div>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-white/50 hover:bg-white/70 transition-colors">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-medium text-sm text-foreground mb-1">تماس با ما</div>
                  <div className="text-xs text-muted-foreground">برای دریافت قیمت دقیق و نهایی، لطفاً با ما تماس بگیرید</div>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-white/50 hover:bg-white/70 transition-colors">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-medium text-sm text-foreground mb-1">زمان تحویل</div>
                  <div className="text-xs text-muted-foreground">زمان تحویل تقریبی: 15-30 روز کاری (بسته به مسیر)</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/contact" className="flex-1">
            <Button size="lg" className="w-full">
              تماس با ما برای قیمت دقیق
              <ArrowRight className="h-5 w-5 mr-2 rotate-180" />
            </Button>
          </Link>
          <Link href="/" className="flex-1">
            <Button size="lg" variant="outline" className="w-full">
              محاسبه مجدد
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function QuotePage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-muted-foreground">در حال بارگذاری...</p>
        </div>
      </div>
    }>
      <QuoteContent />
    </Suspense>
  );
}

