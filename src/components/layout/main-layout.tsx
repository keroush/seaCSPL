/**
 * کامپوننت MainLayout برای ساختار کلی صفحات
 */

import { Header } from "./header/Header";
import { Footer } from "./footer/Footer";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col relative">
      {/* Background Image for entire page */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `url("/images/sea-freight-shipping.png")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.03,
        }}
      />
      
      <div className="relative z-10">
        <Header />
        <main className="flex-1 relative z-10">{children}</main>
        <Footer />
      </div>
    </div>
  );
}

