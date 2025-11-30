/**
 * صفحه خدمات
 */

import { Container, Package, Ship, Shield, Clock, Globe } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const services = [
  {
    icon: Container,
    title: "حمل و نقل کانتینری",
    description: "حمل و نقل کالاهای مختلف در کانتینرهای استاندارد ۲۰ و ۴۰ فوت با امنیت بالا و قیمت رقابتی",
    features: ["کانتینر ۲۰ فوت", "کانتینر ۴۰ فوت", "کانتینر یخچالی", "کانتینر مخزن دار"],
  },
  {
    icon: Package,
    title: "حمل و نقل فله",
    description: "حمل و نقل کالاهای فله مانند غلات، مواد معدنی، مواد شیمیایی و نفت خام",
    features: ["مواد غذایی", "مواد معدنی", "مواد شیمیایی", "نفت و گاز"],
  },
  {
    icon: Ship,
    title: "حمل و نقل کالاهای خاص",
    description: "حمل و نقل کالاهای حساس، خطرناک و با ارزش بالا با رعایت استانداردهای بین‌المللی",
    features: ["کالاهای خطرناک", "کالاهای حساس", "ماشین‌آلات", "کالاهای با ارزش"],
  },
  {
    icon: Shield,
    title: "بیمه محموله",
    description: "پوشش کامل بیمه برای تمام محموله‌های دریایی با بهترین نرخ‌های بیمه",
    features: ["بیمه کامل", "پوشش خسارت", "پرداخت سریع", "نرخ رقابتی"],
  },
  {
    icon: Clock,
    title: "خدمات سریع",
    description: "ارسال سریع و به موقع با برنامه‌ریزی دقیق و رعایت زمان‌بندی",
    features: ["تحویل سریع", "برنامه‌ریزی دقیق", "ردیابی لحظه‌ای", "پشتیبانی ۲۴/۷"],
  },
  {
    icon: Globe,
    title: "پوشش جهانی",
    description: "ارائه خدمات به بیش از ۳۰ کشور در سراسر جهان با شبکه گسترده",
    features: ["۳۰+ کشور", "شبکه گسترده", "تجربه بالا", "قیمت رقابتی"],
  },
];

export default function ServicesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          خدمات ما
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          با استفاده از تجهیزات مدرن و تیم متخصص، بهترین خدمات حمل و نقل دریایی را ارائه می‌دهیم
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="h-16 w-16 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
                <CardDescription className="text-base mt-2">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-4">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href="/contact">
                  <Button variant="outline" className="w-full">
                    درخواست مشاوره
                  </Button>
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="bg-gradient-to-br from-primary to-secondary text-white">
        <CardContent className="pt-12 pb-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            آماده شروع همکاری هستید؟
          </h2>
          <p className="text-lg mb-6 text-white/90">
            با ما تماس بگیرید تا بهترین راهکار را برای شما پیدا کنیم
          </p>
          <Link href="/contact">
            <Button size="lg" variant="secondary">
              تماس با ما
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}

