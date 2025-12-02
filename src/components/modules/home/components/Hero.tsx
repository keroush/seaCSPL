/**
 * کامپوننت Hero برای صفحه اصلی
 */

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, MapPin, Search, Package, Box, Weight, Calculator, Eye, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

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

// نوع محصول
const productTypes = [
  { value: "general", label: "کالای عمومی" },
  { value: "electronics", label: "الکترونیک" },
  { value: "textiles", label: "پارچه و منسوجات" },
  { value: "machinery", label: "ماشین‌آلات" },
  { value: "food", label: "مواد غذایی" },
  { value: "chemicals", label: "مواد شیمیایی" },
  { value: "furniture", label: "مبلمان" },
  { value: "other", label: "سایر" },
];

// نوع کانتینر
const containerTypes = [
  { value: "20ft", label: "کانتینر ۲۰ فوت" },
  { value: "40ft", label: "کانتینر ۴۰ فوت" },
  { value: "40ft-hc", label: "کانتینر ۴۰ فوت High Cube" },
  { value: "45ft", label: "کانتینر ۴۵ فوت" },
  { value: "reefer", label: "کانتینر یخچالی" },
  { value: "open-top", label: "کانتینر Open Top" },
  { value: "flat-rack", label: "کانتینر Flat Rack" },
];

// لیست تصاویر پس‌زمینه
const backgroundImages = [
  "/images/ship-2.jpg",
  "/images/sea-freight-shipping.png",
  "/images/ship-3.jpeg"];

export function Hero() {
  const [activeTab, setActiveTab] = useState<"quote" | "tracking">("quote");
  const [step, setStep] = useState(1);
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [productType, setProductType] = useState("");
  const [containerType, setContainerType] = useState("");
  const [weight, setWeight] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [nextImageIndex, setNextImageIndex] = useState(1);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isFadingIn, setIsFadingIn] = useState(false);

  // محاسبه قیمت تقریبی (نمونه)
  const calculateEstimatedPrice = () => {
    let basePrice = 500; // قیمت پایه
    if (containerType === "20ft") basePrice = 800;
    else if (containerType === "40ft") basePrice = 1200;
    else if (containerType === "40ft-hc") basePrice = 1400;
    else if (containerType === "45ft") basePrice = 1600;
    else if (containerType === "reefer") basePrice = 2000;
    
    const weightFactor = weight ? parseFloat(weight) / 1000 : 1;
    const finalPrice = Math.round(basePrice * weightFactor);
    
    return finalPrice.toLocaleString("fa-IR");
  };

  const handleNext = () => {
    if (step === 1 && origin && destination) {
      setStep(2);
    } else if (step === 2 && productType && containerType && weight) {
      setStep(3);
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    } else if (step === 3) {
      setStep(2);
    }
  };

  const handleSeeDetails = () => {
    const params = new URLSearchParams({
      origin,
      destination,
      productType,
      containerType,
      weight,
    });
    window.location.href = `/quote?${params.toString()}&stops=test,test`;
  };

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingNumber.trim()) {
      window.location.href = `/tracking?number=${trackingNumber.trim()}`;
    }
  };

  const handleTabChange = (tab: "quote" | "tracking") => {
    setActiveTab(tab);
    // Reset step when switching tabs
    if (tab === "quote") {
      setStep(1);
    }
  };

  const getPortLabel = (value: string) => {
    return ports.find(p => p.value === value)?.label || value;
  };

  const getProductTypeLabel = (value: string) => {
    return productTypes.find(p => p.value === value)?.label || value;
  };

  const getContainerTypeLabel = (value: string) => {
    return containerTypes.find(c => c.value === value)?.label || value;
  };

  // تغییر خودکار تصویر پس‌زمینه هر ۳ ثانیه
  useEffect(() => {
    const interval = setInterval(() => {
      // محاسبه تصویر بعدی قبل از شروع fade
      const nextIndex = (currentImageIndex + 1) % backgroundImages.length;
      setNextImageIndex(nextIndex);
      
      // مرحله 1: fade out تصویر فعلی
      setIsFadingOut(true);
      
      // مرحله 2: بعد از fade out، تصویر را تغییر بده
      setTimeout(() => {
        setCurrentImageIndex(nextIndex);
        setIsFadingOut(false);
        
        // مرحله 3: fade in تصویر جدید
        setIsFadingIn(true);
        setTimeout(() => {
          setIsFadingIn(false);
        }, 0); // 1 ثانیه برای fade in
      }, 400); // 1 ثانیه برای fade out
    }, 3000); // هر ۳ ثانیه
    
    return () => clearInterval(interval);
  }, [currentImageIndex]);

  return (
    <section className="relative bg-black text-white py-16 md:py-22 overflow-hidden rounded-lg">
      {/* Background Images with Fade Effect */}
      <div className="absolute inset-0 flex items-center justify-center z-0">
        {/* Current Image - Fades out first */}
        <div 
          className={`w-[99%] h-[97.5%] object-cover rounded-lg absolute transition-opacity duration-1000 ease-in-out ${
            isFadingOut ? 'opacity-0' : 'opacity-100'
          }`}
          style={{
            backgroundImage: `url("${backgroundImages[currentImageIndex]}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          {/* Black Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50 rounded-lg" />
        </div>
        
        {/* Next Image - Fades in after current fades out */}
        <div 
          className={`w-[99%] h-[98%] object-cover rounded-lg absolute transition-opacity duration-1000 ease-in-out ${
            isFadingIn ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `url("${backgroundImages[nextImageIndex]}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          {/* Black Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50 rounded-lg" />
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 h-[50%] w-[50%] opacity-10 z-0">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-18">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              حمل و نقل دریایی
              <br />
              <span className="text-accent">مطمئن و سریع</span>
            </h1>
            <p className="text-base md:text-lg mb-16 text-white/90 leading-relaxed max-w-2xl mx-auto">
              با بیش از ۲۰ سال تجربه در صنعت حمل و نقل دریایی، خدمات خود را به سراسر جهان ارائه می‌دهیم. 
              ردیابی لحظه‌ای، تحویل به موقع و قیمت‌های رقابتی.
            </p>
          </div>

          {/* Search Form */}
          <Card className="bg-white/95 backdrop-blur-sm shadow-xl p-6 md:p-8 border-0">
            {/* Tabs */}
            <div className="flex gap-2 mb-6 border-b border-border">
              <button
                type="button"
                onClick={() => handleTabChange("quote")}
                className={cn(
                  "flex-1 py-3 px-4 text-sm font-medium transition-all duration-200 relative",
                  activeTab === "quote"
                    ? "text-primary border-b-2 border-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Calculator className="h-4 w-4 inline ml-1" />
                محاسبه قیمت
              </button>
              <button
                type="button"
                onClick={() => handleTabChange("tracking")}
                className={cn(
                  "flex-1 py-3 px-4 text-sm font-medium transition-all duration-200 relative",
                  activeTab === "tracking"
                    ? "text-primary border-b-2 border-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Navigation className="h-4 w-4 inline ml-1" />
                ردیابی محموله
              </button>
            </div>

            <div className="space-y-4 min-h-[100px]">
              {/* Tracking Tab */}
              {activeTab === "tracking" && (
                <form onSubmit={handleTrack} className="space-y-4 h-full flex flex-col">
                  <div className="flex-1">
                    
                    <label htmlFor="trackingNumber" className="block text-sm font-medium text-foreground mb-2 justify-center">
                      <p className="absolute left-[5%] text-xs text-muted-foreground mb-2 text-center">
                       شماره ردیابی را از ایمیل یا پیامک خود دریافت کرده‌اید
                      </p>
                      <p>
                        <Package className="h-4 w-4 inline ml-1 text-primary" />
                        شماره ردیابی
                      </p>
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="md:col-span-2">
                        <Input
                          id="trackingNumber"
                          type="text"
                          placeholder="شماره ردیابی (مثال: SH123456789)"
                          value={trackingNumber}
                          onChange={(e) => setTrackingNumber(e.target.value)}
                          className="w-full bg-white text-foreground border-border hover:border-primary transition-colors"
                        />
                      </div>
                    </div>
                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full bg-primary hover:bg-primary-dark"
                    >
                      <Search className="h-5 w-5 ml-2" />
                      ردیابی
                    </Button>
                  </div>
                </form>
              )}

              {/* Quote Tab */}
              {activeTab === "quote" && (
                <div className="h-full flex flex-col">
                  {/* Step 1: Origin and Destination */}
                  {step === 1 && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="origin" className="block text-sm font-medium text-foreground mb-2">
                        <MapPin className="h-4 w-4 inline ml-1 text-primary" />
                        مبدا
                      </label>
                      <Select
                        id="origin"
                        options={ports}
                        placeholder="انتخاب مبدا"
                        value={origin}
                        onChange={(e) => setOrigin(e.target.value)}
                        className="bg-white text-foreground border-border hover:border-primary transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="destination" className="block text-sm font-medium text-foreground mb-2">
                        <MapPin className="h-4 w-4 inline ml-1 text-primary" />
                        مقصد
                      </label>
                      <Select
                        id="destination"
                        options={ports}
                        placeholder="انتخاب مقصد"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        className="bg-white text-foreground border-border hover:border-primary transition-colors"
                      />
                    </div>
                  </div>
                  <Button
                    size="lg"
                    className="w-full bg-primary hover:bg-primary-dark"
                    onClick={handleNext}
                    disabled={!origin || !destination}
                  >
                    بعدی
                    <ArrowLeft className="h-5 w-5 mr-2 rotate-180" />
                  </Button>
                </>
              )}

              {/* Step 2: Product Type, Container Type, and Weight */}
              {step === 2 && (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-foreground">جزئیات محموله</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="text-muted-foreground"
                    >
                      <ArrowLeft className="h-4 w-4 ml-1" />
                      بازگشت
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="productType" className="block text-sm font-medium text-foreground mb-2">
                        <Package className="h-4 w-4 inline ml-1 text-primary" />
                        نوع محصول
                      </label>
                      <Select
                        id="productType"
                        options={productTypes}
                        placeholder="انتخاب نوع محصول"
                        value={productType}
                        onChange={(e) => setProductType(e.target.value)}
                        className="bg-white text-foreground border-border hover:border-primary transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="containerType" className="block text-sm font-medium text-foreground mb-2">
                        <Box className="h-4 w-4 inline ml-1 text-primary" />
                        نوع کانتینر
                      </label>
                      <Select
                        id="containerType"
                        options={containerTypes}
                        placeholder="انتخاب نوع کانتینر"
                        value={containerType}
                        onChange={(e) => setContainerType(e.target.value)}
                        className="bg-white text-foreground border-border hover:border-primary transition-colors"
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="weight" className="block text-sm font-medium text-foreground mb-2">
                      <Weight className="h-4 w-4 inline ml-1 text-primary" />
                      وزن (کیلوگرم)
                    </label>
                    <Input
                      id="weight"
                      type="number"
                      placeholder="مثال: 10000"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      className="bg-white text-foreground border-border hover:border-primary transition-colors"
                    />
                  </div>
                  <Button
                    size="lg"
                    className="w-full bg-primary hover:bg-primary-dark"
                    onClick={handleNext}
                    disabled={!productType || !containerType || !weight}
                  >
                    <Calculator className="h-5 w-5 ml-2" />
                    محاسبه تقریبی هزینه
                  </Button>
                </>
              )}

              {/* Step 3: Estimated Price and Selected Options */}
              {step === 3 && (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-foreground">نتیجه محاسبه</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="text-muted-foreground"
                    >
                      <ArrowLeft className="h-4 w-4 ml-1" />
                      بازگشت
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {/* Estimated Price - Left Side */}
                    <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
                      <CardContent className="pt-6">
                        <div className="text-center">
                          <div className="text-xs text-muted-foreground mb-2">هزینه تقریبی</div>
                          <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
                            {calculateEstimatedPrice()} <span className="text-xl md:text-2xl">ریال</span>
                          </div>
                          <div className="text-xs text-muted-foreground mt-2">
                            * این قیمت تقریبی است
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Selected Options - Right Side */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between py-1.5 border-b border-border">
                        <span className="text-xs text-muted-foreground">مبدا:</span>
                        <span className="text-xs font-medium text-foreground">{getPortLabel(origin)}</span>
                      </div>
                      <div className="flex items-center justify-between py-1.5 border-b border-border">
                        <span className="text-xs text-muted-foreground">مقصد:</span>
                        <span className="text-xs font-medium text-foreground">{getPortLabel(destination)}</span>
                      </div>
                      <div className="flex items-center justify-between py-1.5 border-b border-border">
                        <span className="text-xs text-muted-foreground">نوع محصول:</span>
                        <span className="text-xs font-medium text-foreground">{getProductTypeLabel(productType)}</span>
                      </div>
                      <div className="flex items-center justify-between py-1.5 border-b border-border">
                        <span className="text-xs text-muted-foreground">نوع کانتینر:</span>
                        <span className="text-xs font-medium text-foreground">{getContainerTypeLabel(containerType)}</span>
                      </div>
                      <div className="flex items-center justify-between py-1.5">
                        <span className="text-xs text-muted-foreground">وزن:</span>
                        <span className="text-xs font-medium text-foreground">{parseFloat(weight).toLocaleString("fa-IR")} کیلوگرم</span>
                      </div>
                    </div>
                  </div>

                  <Button
                    size="lg"
                    className="w-full bg-primary hover:bg-primary-dark"
                    onClick={handleSeeDetails}
                  >
                    <Eye className="h-5 w-5 ml-2" />
                    مشاهده جزئیات
                  </Button>
                </>
              )}
                </div>
              )}
            </div>
          </Card>

          {/* Quick Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
            <Link href="/tracking">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                ردیابی محموله
                <ArrowLeft className="h-5 w-5 mr-2" />
              </Button>
            </Link>
            <Link href="/services">
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-white/10 border-white/20 text-white hover:bg-white/20">
                مشاهده خدمات
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

