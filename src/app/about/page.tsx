/**
 * صفحه درباره ما
 */

import { Ship, Users, Award, Target } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const values = [
  {
    icon: Target,
    title: "ماموریت ما",
    description: "ارائه بهترین خدمات حمل و نقل دریایی با کیفیت بالا و قیمت رقابتی به مشتریان در سراسر جهان",
  },
  {
    icon: Award,
    title: "چشم‌انداز",
    description: "تبدیل شدن به یکی از برترین شرکت‌های حمل و نقل دریایی در منطقه با تمرکز بر نوآوری و رضایت مشتری",
  },
  {
    icon: Users,
    title: "ارزش‌های ما",
    description: "صداقت، کیفیت، تعهد و رضایت مشتری از اصلی‌ترین ارزش‌های ما در ارائه خدمات است",
  },
];

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Ship className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            درباره ما
          </h1>
          <p className="text-lg text-muted-foreground">
            بیش از ۲۰ سال تجربه در صنعت حمل و نقل دریایی
          </p>
        </div>

        <div className="prose prose-lg max-w-none mb-12">
          <p className="text-foreground leading-relaxed mb-4">
            شرکت حمل و نقل دریایی ما با بیش از ۲۰ سال تجربه در صنعت حمل و نقل، یکی از پیشروان این صنعت در منطقه است. 
            ما با استفاده از تجهیزات مدرن و تیم متخصص، خدمات خود را به بیش از ۳۰ کشور در سراسر جهان ارائه می‌دهیم.
          </p>
          <p className="text-foreground leading-relaxed mb-4">
            ماموریت ما ارائه بهترین خدمات حمل و نقل دریایی با کیفیت بالا، قیمت رقابتی و رعایت استانداردهای بین‌المللی است. 
            ما متعهد به رضایت مشتریان خود هستیم و همواره در تلاش برای بهبود کیفیت خدمات خود می‌باشیم.
          </p>
          <p className="text-foreground leading-relaxed">
            با شبکه گسترده از بنادر و کشتی‌های مدرن، ما قادر به ارائه خدمات سریع، مطمئن و مقرون به صرفه به مشتریان خود هستیم. 
            ردیابی لحظه‌ای محموله‌ها و پشتیبانی ۲۴ ساعته از دیگر مزایای همکاری با ما است.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <Card key={index}>
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="bg-muted">
          <CardContent className="pt-12 pb-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-primary mb-2">۲۰+</div>
                <div className="text-sm text-muted-foreground">سال تجربه</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">۵۰+</div>
                <div className="text-sm text-muted-foreground">کشتی فعال</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">۳۰+</div>
                <div className="text-sm text-muted-foreground">کشور مقصد</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">۱۰,۰۰۰+</div>
                <div className="text-sm text-muted-foreground">محموله تحویل شده</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

