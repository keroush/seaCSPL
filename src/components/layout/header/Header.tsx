/**
 * کامپوننت Header
 */

"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Ship, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/auth-store";
import { cn } from "@/lib/utils";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, isAuthenticated, logout } = useAuthStore();

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      
      // Update directly without RAF for immediate response
      setScrollProgress(Math.min(100, Math.max(0, progress)));
      
      // Update scroll state - change to white when scrolled
      setIsScrolled(scrollTop > 10);
    };

    // Use throttled scroll for better performance
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateScrollProgress();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateScrollProgress(); // Initial calculation

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navItems = [
    { href: "/", label: "خانه" },
    { href: "/services", label: "خدمات" },
    { href: "/tracking", label: "ردیابی" },
    { href: "/about", label: "درباره ما" },
    { href: "/contact", label: "تماس با ما" },
  ];

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  return (
    <header className={cn(
      "sticky top-0 z-40 w-full border-b backdrop-blur-sm transition-all duration-300",
      isScrolled 
        ? "bg-primary" 
        : "bg-background border-border"
    )}>
      {/* Progress Bar - Smooth and exact scroll tracking */}
      <div className={cn("absolute bottom-0 left-0 w-full h-1 bg-muted overflow-hidden", isScrolled ? "bg-primary" : "bg-background")}>
        <div 
          className="h-full bg-gradient-to-r from-background via-primary-light to-secondary shadow-[0_0_10px_rgba(0,102,204,0.5)]"
          style={{ 
            width: `${scrollProgress}%`,
            transition: 'width 0.05s linear',
            willChange: 'width'
          }} 
        />
      </div>
      
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Ship className={cn("h-8 w-8 transition-colors", isScrolled ? "text-white" : "text-primary")} />
            <span className={cn("text-xl font-bold transition-colors", isScrolled ? "text-white" : "text-foreground")}>
              حمل و نقل دریایی
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors",
                  isScrolled 
                    ? "text-white/90 hover:text-white" 
                    : "text-foreground hover:text-primary"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Link href="/dashboard">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className={cn(
                      isScrolled ? "text-white hover:bg-white/20" : ""
                    )}
                  >
                    <User className="h-4 w-4 mr-2" />
                    {user?.name || "پنل کاربری"}
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleLogout}
                  className={cn(
                    isScrolled ? "text-white border-white/30 hover:bg-white/20" : ""
                  )}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  خروج
                </Button>
              </>
            ) : (
              <Link href="/auth/login">
                <Button 
                  size="sm"
                  className={cn(
                    !isScrolled 
                      ? "bg-white text-primary hover:bg-white/90" 
                      : ""
                  )}
                >
                  ورود / ثبت نام
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "md:hidden",
              isScrolled ? "text-white hover:bg-white/20" : ""
            )}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="منو"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300",
            isMenuOpen ? "max-h-96 pb-4" : "max-h-0"
          )}
        >
          <nav className="flex flex-col gap-4 pt-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors py-2",
                  isScrolled 
                    ? "text-white/90 hover:text-white" 
                    : "text-foreground hover:text-primary"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className={cn(
              "pt-4 border-t",
              isScrolled ? "border-white/20" : "border-border"
            )}>
              {isAuthenticated ? (
                <>
                  <Link href="/dashboard" onClick={() => setIsMenuOpen(false)}>
                    <Button 
                      variant="ghost" 
                      className={cn(
                        "w-full justify-start",
                        isScrolled ? "text-white hover:bg-white/20" : ""
                      )}
                    >
                      <User className="h-4 w-4 mr-2" />
                      پنل کاربری
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start mt-2",
                      isScrolled ? "text-white border-white/30 hover:bg-white/20" : ""
                    )}
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    خروج
                  </Button>
                </>
              ) : (
                <Link href="/auth/login" onClick={() => setIsMenuOpen(false)}>
                  <Button 
                    className={cn(
                      "w-full",
                      isScrolled ? "bg-white text-primary hover:bg-white/90" : ""
                    )}
                  >
                    ورود / ثبت نام
                  </Button>
                </Link>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

