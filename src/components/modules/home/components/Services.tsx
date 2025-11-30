/**
 * کامپوننت Services برای نمایش خدمات
 */

import { Container, Ship, Package, Shield, Clock, Globe, ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const services = [
  {
    icon: Container,
    title: "حمل و نقل کانتینری",
    description: "حمل و نقل کالاهای مختلف در کانتینرهای استاندارد با امنیت بالا",
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50 dark:bg-blue-950/20",
  },
  {
    icon: Package,
    title: "حمل و نقل فله",
    description: "حمل و نقل کالاهای فله مانند غلات، مواد معدنی و مواد شیمیایی",
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-50 dark:bg-purple-950/20",
  },
  {
    icon: Ship,
    title: "حمل و نقل کالاهای خاص",
    description: "حمل و نقل کالاهای حساس، خطرناک و با ارزش بالا",
    color: "from-orange-500 to-red-500",
    bgColor: "bg-orange-50 dark:bg-orange-950/20",
  },
  {
    icon: Shield,
    title: "بیمه محموله",
    description: "پوشش کامل بیمه برای تمام محموله‌های دریایی",
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-50 dark:bg-green-950/20",
  },
  {
    icon: Clock,
    title: "خدمات سریع",
    description: "ارسال سریع و به موقع با برنامه‌ریزی دقیق",
    color: "from-indigo-500 to-blue-500",
    bgColor: "bg-indigo-50 dark:bg-indigo-950/20",
  },
  {
    icon: Globe,
    title: "پوشش جهانی",
    description: "ارائه خدمات به بیش از ۳۰ کشور در سراسر جهان",
    color: "from-teal-500 to-cyan-500",
    bgColor: "bg-teal-50 dark:bg-teal-950/20",
  },
];

export function Services() {
  return (
    <section className="py-12 relative">
      <div className="container mx-auto px-4">
        {/* Minimal header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            خدمات ما
          </h2>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            راهکارهای جامع حمل و نقل دریایی
          </p>
        </div>

        {/* Modern card grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="group relative"
              >
                {/* Card with modern design */}
                <Card className="h-full border-0 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden bg-gradient-to-br from-background to-muted/30 hover:from-muted/50 hover:to-background relative">
                  {/* Animated gradient border */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                  
                  {/* Top accent bar */}
                  <div className={`h-1 bg-gradient-to-r ${service.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}></div>
                  
                  <CardContent className="p-6 relative">
                    {/* Icon with modern style */}
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${service.color} shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      {/* Number badge */}
                    </div>
                    
                    {/* Content */}
                    <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-5 leading-relaxed line-clamp-2">
                      {service.description}
                    </p>
                    
                    {/* Modern link with arrow */}
                    <Link 
                      href="/services" 
                      className="inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all"
                    >
                      <span>اطلاعات بیشتر</span>
                      <ArrowLeft className="h-4 w-4 rotate-180 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </CardContent>
                  
                  {/* Decorative corner element */}
                  <div className={`absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr ${service.color} opacity-0 group-hover:opacity-5 rounded-tr-full transition-opacity duration-300`}></div>
                </Card>
              </div>
            );
          })}
        </div>

        {/* Minimal CTA */}
        <div className="text-center">
          <Link href="/services">
            <Button 
              variant="outline"
              size="sm"
              className="text-sm"
            >
              مشاهده تمام خدمات
              <ArrowLeft className="h-4 w-4 mr-1 rotate-180" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

