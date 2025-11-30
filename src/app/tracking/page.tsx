/**
 * صفحه ردیابی محموله
 */

"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search, Package, MapPin, Calendar, CheckCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { get, handleError } from "@/lib/fetcher";
import { API_ROUTES } from "@/lib/api-routes";
import { formatDate } from "@/lib/utils";

interface TrackingStatus {
  trackingNumber: string;
  status: string;
  origin: string;
  destination: string;
  currentLocation?: string;
  estimatedDelivery?: string;
  history: Array<{
    date: string;
    location: string;
    description: string;
  }>;
}

function TrackingContent() {
  const searchParams = useSearchParams();
  const [trackingNumber, setTrackingNumber] = useState("");
  const [trackingData, setTrackingData] = useState<TrackingStatus | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const number = searchParams.get("number");
    if (number) {
      setTrackingNumber(number);
      handleTrack(number);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handleTrack = async (number?: string) => {
    const num = number || trackingNumber;
    if (!num.trim()) {
      setError("لطفا شماره ردیابی را وارد کنید");
      return;
    }

    setIsLoading(true);
    setError("");
    setTrackingData(null);

    try {
      const data = await get<TrackingStatus>(
        API_ROUTES.tracking.track(num.trim())
      );
      setTrackingData(data);
    } catch (err) {
      setError(handleError(err));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleTrack();
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            ردیابی محموله
          </h1>
          <p className="text-lg text-muted-foreground">
            شماره ردیابی خود را وارد کنید تا از وضعیت محموله مطلع شوید
          </p>
        </div>

        <Card className="mb-8">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="شماره ردیابی (مثال: SH123456789)"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  className="flex-1"
                  disabled={isLoading}
                />
                <Button type="submit" size="lg" disabled={isLoading}>
                  <Search className="h-5 w-5 ml-2" />
                  {isLoading ? "در حال جستجو..." : "ردیابی"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {error && (
          <Card className="mb-8 border-red-200 bg-red-50">
            <CardContent className="pt-6">
              <p className="text-error text-center">{error}</p>
            </CardContent>
          </Card>
        )}

        {trackingData && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  اطلاعات محموله
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <span className="text-sm text-muted-foreground">شماره ردیابی:</span>
                  <p className="font-semibold">{trackingData.trackingNumber}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{trackingData.origin}</span>
                  </div>
                  <span>→</span>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{trackingData.destination}</span>
                  </div>
                </div>
                {trackingData.currentLocation && (
                  <div>
                    <span className="text-sm text-muted-foreground">موقعیت فعلی:</span>
                    <p className="font-medium">{trackingData.currentLocation}</p>
                  </div>
                )}
                {trackingData.estimatedDelivery && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">تخمین تحویل:</span>
                    <span className="font-medium">{formatDate(trackingData.estimatedDelivery)}</span>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>تاریخچه ردیابی</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trackingData.history.map((item, index) => (
                    <div key={index} className="flex gap-4 pb-4 border-b border-border last:border-0">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <CheckCircle className="h-5 w-5 text-primary" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{item.description}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {item.location}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {formatDate(item.date)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

export default function TrackingPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-muted-foreground">در حال بارگذاری...</p>
        </div>
      </div>
    }>
      <TrackingContent />
    </Suspense>
  );
}

