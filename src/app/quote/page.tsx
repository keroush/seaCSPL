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
import Image from "next/image";

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

  const computeRoutePorts = () => {
    // در صورت وجود پارامتر "stops" در URL (لیست comma-separated)، آن‌ها را بین مبدا و مقصد قرار می‌دهیم
    const stopsParam = searchParams.get("stops") || "";
    const viaValues = stopsParam
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const viaLabels = viaValues.map((v) => getPortLabel(v));
    return [getPortLabel(origin), ...viaLabels, getPortLabel(destination)];
  };
  const routePorts = computeRoutePorts();
  const stopsCount = routePorts.length;
  // const denom = Math.max(stopsCount - 1, 1);

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
          <Card className="md:col-span-2 border-2 border-secondary/20 bg-gradient-to-br from-secondary/5 to-accent/5 shadow-md hover:shadow-lg transition-all">
          <CardHeader className="border-b border-primary/10">
              <CardTitle className="flex items-center gap-2 text-primary">
                <Package className="h-5 w-5" />
                 مسیر حمل و نقل
              </CardTitle>
              <CardDescription className="font-medium text-foreground mt-2">{routePorts.slice(1,routePorts.length-1).length} بندر میان راهی</CardDescription>
            </CardHeader>
            <CardContent className="pt-3">
              <div className="w-full mt-3 bg-white rounded-lg p-4 flex justify-around items-end">
                <div className="w-[70%] flex flex-row items-center justify-around gap-[2%]">
                  <div className="flex flex-col items-center">
                  <svg fill="#000000" width="20px" height="20px" viewBox="0 0 24 24" data-name="Layer 1" id="Layer_1" xmlns="http://www.w3.org/2000/svg">
                    <title/>
                    <path d="M6,13.3l1.21.54A7.22,7.22,0,0,0,12.8,14a5.17,5.17,0,0,1,4.23.18l3,1.48V5.38l-2.08-1a7.18,7.18,0,0,0-5.87-.24A5.2,5.2,0,0,1,8,4L6,3.11V2H4V22H6Z"/>
                </svg>
                <div className="sm:flex flex-col justify-center items-center gap-1 mt-1 md:flex-row">
                    <div className="flex text-xs text-muted-foreground mt-1 justify-center items-center">مبدا</div>
                    <div className="flex text-sm font-semibold text-foreground justify-center items-center">{routePorts[0]}</div>
                  </div>
                  </div>
                  {/* <Image alt="arrow" src={"/images/arrow.png"} className="w-8 h-5" width={5} height={5}/> */}
                </div>
                {routePorts.slice(1,routePorts.length-1).map((name, idx) => {
                  // const x = (idx / denom) * 100;
                  return (
                    <div key={idx} className={`${idx == 0 ? "w-[165%] gap-[5%]" : "w-full gap-[1%]"} h-full flex flex-row justify-around items-center`}>
                      {idx == 0 && <Image alt="arrow" src={"/images/arrow.png"} className="w-8 h-5" width={5} height={5}/>}
                      <div className="flex flex-col items-center justify-center">
                      <svg width="20px" height="20px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                          <path fill="#000000" d="M17 17v104.2l86 23.7V17zm0 122.8c-1.4 99.4 1.35 296.5 1 296.7.12 0 .23-.1.35-.2C31.89 428 48.05 419 64 419c15.97 0 27.59 10 37.6 18 10 8 18.5 14 26.4 14 3 0 6.1-.9 9.3-2.4l90.9-250.5zm86 68.2h18v18l23 5.2-4 17.6-19-4.3v58.9c1.2-1.4 2.3-2.7 3.4-4.2 5.6-7.5 9.6-15.3 9.6-15.3l16 8.2s-4.5 8.9-11.2 17.9c-3.3 4.4-7.2 9-11.9 12.7-4.7 3.7-10.6 7-17.8 6.3-8.2-.9-14.33-5.9-19.04-11.5-4.7-5.5-8.35-12-11.36-18.3-6.02-12.7-9.37-24.8-9.37-24.8l17.34-4.8s3.08 10.9 8.28 21.8c2.38 5 5.25 9.9 8.05 13.5v-64.5l-24.98-5.6 3.96-17.6 21.02 4.7zm132.8 22l-8.6 23.7c10.2 17.5 23.3 29.8 38.1 37.8 18.8 10.1 40.1 13.2 61.7 13.5v-18c-19.8-.3-38-3.3-53.2-11.4-15.6-8.3-28.6-21.9-38-45.6zm84.2 17v18h25v46h30v-46h25v-18zm-55 82v46h46v-46zm64 0v46h110v-46h-46zm128 0v46h30v-46zm-227.4 5.3c-2 .1-3.9.5-5.5 1.3-3.1 1.5-5.6 3.9-7.9 6.6-4.5 5.6-8.3 13.3-10.9 22.6-2.6 9.2-3.7 18.2-3 26.4.3 4.1 1 8 2.6 11.8 1.7 3.8 4.6 7.9 9 10 4.3 2.1 8.5 1.6 11.7.1 3.2-1.4 5.6-3.9 7.9-6.6 4.6-5.6 8.3-13.3 11-22.6 2.6-9.2 3.6-18.2 3-26.4-.4-4-1-8-2.7-11.7-1.7-3.9-4.6-8-8.9-10.1-2.1-1.1-4.3-1.4-6.3-1.4zm.7 21.1c0 .6.2.7.2 1.3.4 4.7-.2 12-2.3 19.3-2.1 7.3-5.2 13.3-7.9 16.5-.3.5-.5.4-.8.8-.1-.6-.2-.7-.3-1.3-.4-4.7.3-12 2.4-19.3 2-7.3 5.2-13.3 7.8-16.5.4-.5.6-.4.9-.8zM265 393v46h110v-46zm128 0v46h94v-46zM64 437c-4.68 0-12.17 2.5-20.09 6.1-9.03 3.4-17.74 8.4-25.57 13.2-.12.1-.22.1-.34.2V478c2.94-2 6.22-4.1 9.77-6.3C40.26 464 56.1 457 64 457c7.9 0 16.34 6 26.37 14 10.03 8 21.63 18 37.63 18 16 0 27.6-10 37.6-18s18.5-14 26.4-14c7.9 0 23.8 7 36.2 14.7 8.3 5 15 9.9 18.8 12.7v-22c-2.8-2-6-4-9.3-6.1C224.1 448 208 439 192 439c-16 0-27.6 10-37.6 18s-18.5 14-26.4 14c-7.9 0-16.4-6-26.4-14-7.14-5.7-15.08-12.4-24.8-15.8-4.5-2.6-8.72-4.2-12.8-4.2zm201 20v30h46v-30zm64 0v30h110v-30zm128 0v30h30v-30z"/>
                      </svg>
                      <div className="flex items-center gap-[1%] mt-1">
                    <div className="sm:max-w-10 text-xs text-muted-foreground mt-1 overflow-hidden md:max-w-[100%]">{name}</div>
                  </div>
                      </div>
                      <Image alt="arrow" src={"/images/arrow.png"} className="w-8 h-5" width={5} height={5}/>
                    </div>
                  );
                })}
                <div className="w-[70%] flex flex-col items-center">
                <svg fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" 
                width="20px" height="20px" viewBox="0 0 45.204 45.204"
                xmlSpace="preserve">
                  <g>
                  	<g>
                  		<path d="M29.67,28.924c-0.734,0.348-1.554,0.532-2.367,0.532c-0.916,0-1.826-0.229-2.633-0.667
                  			c-1.545-0.836-2.609-2.374-2.847-4.111c-0.076-0.556-0.147-1.098-0.214-1.631c-0.513,0.666-0.773,1.405-0.542,2.135
                  			c0.567,1.789,2.017,5.19,0,5.929c-2.019,0.737-3.797,1.427-2.787,2.788c1.231,1.662,2.819,1.027,4.231,2.052
                  			c0.924,0.672,0.19,2.216,0.518,3.202c-1.605,0.729-3.388,1.133-5.263,1.133c-3.659,0-6.964-1.544-9.297-4.016
                  			c-0.08-1.241,2.61-1.319,2.503-2.498c-0.058-0.639,0.514-2.307,3.718-2.661c3.207-0.353,2.242-3.455,1.796-4.519
                  			c-0.753-1.795-3.847-2.309-6.131-1.412c-2.286,0.897-0.664-2.436,1.243-6.024c0.875-1.648,0.328-2.323-0.52-2.572
                  			c1.832-1.128,3.968-1.806,6.253-1.883c0.081,0.334,0.257,0.745,0.564,1.25c1.105,1.491-2.18,3.116-1.666,3.609
                  			c0.512,0.493,2.673,0.172,3.46-0.661c0.389-0.41,0.918-0.739,1.407-0.962c-0.223-3.042-0.243-5.666-0.061-7.861
                  			c-1.061-0.198-2.152-0.304-3.271-0.304c-9.769,0-17.715,7.947-17.715,17.717c0,9.77,7.946,17.716,17.715,17.716
                  			c9.77,0,17.716-7.946,17.716-17.716c0-0.5-0.021-0.995-0.062-1.484C33.692,26.953,31.776,27.928,29.67,28.924z"/>
                  		<path d="M39.553,1.291C37.936,0.416,36.194,0,34.475,0c-3.795,0-7.473,2.028-9.406,5.601c-2.014,3.723-1.035,13.463-0.319,18.672
                  			c0.11,0.814,0.604,1.527,1.327,1.918c0.382,0.207,0.805,0.311,1.229,0.311c0.377,0,0.752-0.082,1.104-0.248
                  			c4.753-2.25,13.443-6.758,15.458-10.481C46.672,10.584,44.745,4.1,39.553,1.291z M38.475,12.619
                  			c-1.166,2.158-3.865,2.961-6.022,1.793c-2.16-1.168-2.961-3.865-1.794-6.024c1.169-2.159,3.865-2.961,6.023-1.793
                  			C38.84,7.764,39.645,10.461,38.475,12.619z"/>
                  	</g>
                  </g>
                </svg>
                  <div className="sm:flex flex-col justify-cnter items-center gap-1 mt-1 md:flex-row">
                    <div className="flex text-xs text-muted-foreground mt-1 justify-center items-center">مقصد</div>
                    <div className="flex text-sm font-semibold text-foreground justify-center items-center">{routePorts[routePorts.length-1]}</div>
                  </div>
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

