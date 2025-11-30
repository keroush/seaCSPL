/**
 * کامپوننت Stats برای نمایش آمار
 */

import { Ship, Package, Globe, TrendingUp, Award, Users, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function Stats() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.15,
        }}
      />
      {/* Dark overlay for better readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/80 z-0"></div>
      
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5 z-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-20">
        {/* About Us Section */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 border-primary/20 bg-primary/5 text-primary text-sm font-semibold">
              <Award className="h-4 w-4" />
              درباره ما
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            شرکت حمل و نقل دریایی پیشرو
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-3xl mx-auto leading-relaxed mb-8">
            با بیش از ۲۰ سال تجربه در صنعت حمل و نقل دریایی، ما یکی از معتبرترین شرکت‌های فعال در این زمینه هستیم. 
            ما با استفاده از تجهیزات مدرن، تیم متخصص و شبکه گسترده از شریکان تجاری، خدمات جامع حمل و نقل دریایی را 
            به بیش از ۳۰ کشور در سراسر جهان ارائه می‌دهیم. تعهد ما به کیفیت، امنیت و رضایت مشتریان، ما را به یکی از 
            برترین انتخاب‌ها در این صنعت تبدیل کرده است.
          </p>
          
          {/* About Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5 shadow-md hover:shadow-lg transition-all duration-300">
              <CardContent className="pt-6 pb-6 text-center">
                <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Users className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">تیم متخصص</h3>
                <p className="text-sm text-muted-foreground">
                  تیمی از متخصصان با تجربه و دانش عمیق در زمینه حمل و نقل دریایی
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-secondary/20 bg-gradient-to-br from-secondary/5 to-accent/5 shadow-md hover:shadow-lg transition-all duration-300">
              <CardContent className="pt-6 pb-6 text-center">
                <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-secondary to-secondary-dark flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Award className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">کیفیت برتر</h3>
                <p className="text-sm text-muted-foreground">
                  ارائه خدمات با بالاترین استانداردهای کیفیت و امنیت
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-accent/20 bg-gradient-to-br from-accent/5 to-primary/5 shadow-md hover:shadow-lg transition-all duration-300">
              <CardContent className="pt-6 pb-6 text-center">
                <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Clock className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">تحویل به موقع</h3>
                <p className="text-sm text-muted-foreground">
                  تعهد به تحویل به موقع و ردیابی لحظه‌ای محموله‌ها
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            دستاوردهای ما در یک نگاه
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            سال‌ها تجربه در زمینه حمل و نقل دریایی با رضایت مشتریان
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* Stat Card 1 */}
          <Card className="group border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <CardContent className="pt-6 pb-6 text-center relative z-10">
              <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Ship className="h-8 w-8 text-white" />
              </div>
              <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
                ۵۰+
              </div>
              <div className="text-foreground text-base font-semibold mb-1">کشتی فعال</div>
              <div className="text-muted-foreground text-xs">در حال حاضر در حال فعالیت</div>
            </CardContent>
          </Card>

          {/* Stat Card 2 */}
          <Card className="group border-2 border-secondary/20 bg-gradient-to-br from-secondary/5 to-accent/5 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <CardContent className="pt-6 pb-6 text-center relative z-10">
              <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-secondary to-secondary-dark flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Package className="h-8 w-8 text-white" />
              </div>
              <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-secondary to-secondary-dark bg-clip-text text-transparent">
                ۱۰,۰۰۰+
              </div>
              <div className="text-foreground text-base font-semibold mb-1">محموله تحویل شده</div>
              <div className="text-muted-foreground text-xs">با موفقیت به مقصد رسیده</div>
            </CardContent>
          </Card>

          {/* Stat Card 3 */}
          <Card className="group border-2 border-accent/20 bg-gradient-to-br from-accent/5 to-primary/5 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <CardContent className="pt-6 pb-6 text-center relative z-10">
              <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-accent to-accent-dark bg-clip-text text-transparent">
                ۳۰+
              </div>
              <div className="text-foreground text-base font-semibold mb-1">کشور مقصد</div>
              <div className="text-muted-foreground text-xs">در سراسر جهان</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

