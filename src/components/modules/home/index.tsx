/**
 * ماژول Home - صفحه اصلی
 */

import { Hero } from "./components/Hero";
import { Stats } from "./components/Stats";
import { Services } from "./components/Services";
import { Tracking } from "./components/Tracking";

export function HomeModule() {
  return (
    <>
      <Hero />
      <Stats />
      <Tracking />
    </>
  );
}

