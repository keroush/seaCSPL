/**
 * کامپوننت Footer
 */

import Link from "next/link";
import { Ship, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    خدمات: [
      { href: "/services", label: "حمل و نقل کانتینری" },
      { href: "/services", label: "حمل و نقل فله" },
      { href: "/services", label: "حمل و نقل کالاهای خاص" },
      { href: "/tracking", label: "ردیابی محموله" },
    ],
    شرکت: [
      { href: "/about", label: "درباره ما" },
      { href: "/about", label: "تیم ما" },
      { href: "/contact", label: "تماس با ما" },
      { href: "/contact", label: "فرصت‌های شغلی" },
    ],
    پشتیبانی: [
      { href: "/contact", label: "پشتیبانی" },
      { href: "/tracking", label: "سوالات متداول" },
      { href: "/contact", label: "قوانین و مقررات" },
    ],
  };

  return (
    <footer className="bg-muted border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Ship className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold text-foreground">
                حمل و نقل دریایی
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              ارائه خدمات حمل و نقل دریایی با کیفیت و قابل اعتماد در سراسر جهان
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>021-12345678</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>info@shipping.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>تهران، ایران</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground">
                {title}
              </h3>
              <ul className="space-y-2">
                {links.map((link, index) => (
                  <li key={`${link.href}-${link.label}-${index}`}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} شرکت حمل و نقل دریایی. تمامی حقوق محفوظ است.
          </p>
        </div>
      </div>
    </footer>
  );
}

