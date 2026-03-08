"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Star, TrendingUp, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { useUnsplashImages } from "@/lib/useUnsplashImages";

interface Slide {
  tag: string;
  headline: [string, string];
  sub: string;
  accent: string;
  query: string;
  badge: string;
  color: string;
  darkColor: string;
}

interface Stat {
  icon: React.ElementType;
  label: string;
  value: string;
}

const slides: Slide[] = [
  {
    tag: "Best Gadget & Fashion",
    headline: ["30% Off", "Winter Sale"],
    sub: "This year, our new collection will shelter you from the harsh elements of a world that demands more.",
    accent: "Winter Sale",
    query: "electronics gadgets modern",
    badge: "New Arrivals",
    color: "from-purple-50 to-violet-100",
    darkColor: "dark:from-purple-950/30 dark:to-violet-900/20",
  },
  {
    tag: "Baby & Kids",
    headline: ["Everyday", "Kids Collection"],
    sub: "Feel amazing every day with our curated range of kids clothing, bags, and accessories for every occasion.",
    accent: "Kids Collection",
    query: "kids fashion colorful",
    badge: "Limited Stock",
    color: "from-pink-50 to-rose-100",
    darkColor: "dark:from-pink-950/30 dark:to-rose-900/20",
  },
  {
    tag: "Home & Living",
    headline: ["Refresh Your", "Living Space"],
    sub: "Discover premium furniture and home appliances designed to elevate your everyday living experience.",
    accent: "Living Space",
    query: "modern home interior furniture",
    badge: "Trending Now",
    color: "from-amber-50 to-orange-100",
    darkColor: "dark:from-amber-950/30 dark:to-orange-900/20",
  },
];

const stats: Stat[] = [
  { icon: Star, label: "#1 eCommerce Platform", value: "#1" },
  { icon: TrendingUp, label: "Client Testimonials", value: "25k+" },
  { icon: Zap, label: "Real Customers & Buyers", value: "1 Million" },
];

const slideItems = slides.map((s) => ({ name: s.query, query: s.query }));

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const images = useUnsplashImages(slideItems, "landscape");

  useEffect(() => {
    const timer = setInterval(() => setCurrent((p) => (p + 1) % slides.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  return (
    <section className="relative overflow-hidden">
      {/* Hero main */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className={`min-h-145 lg:min-h-160 bg-linear-to-br ${slide.color} ${slide.darkColor} relative flex items-center`}
        >
          {/* Decorative blobs */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-primary/5 rounded-full blur-2xl translate-y-1/3 pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 lg:py-24 grid lg:grid-cols-2 gap-12 items-center">
            {/* Left — text */}
            <div className="flex flex-col gap-6 z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Badge variant="secondary" className="text-primary font-semibold px-3 py-1 text-xs uppercase tracking-wider">
                  {slide.tag}
                </Badge>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-5xl lg:text-7xl font-black leading-none tracking-tight text-foreground"
              >
                {slide.headline[0]}{" "}
                <span className="text-primary relative">
                  {slide.headline[1]}
                  <motion.span
                    className="absolute -bottom-2 left-0 h-1 bg-primary rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                  />
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-muted-foreground text-base lg:text-lg max-w-md leading-relaxed"
              >
                {slide.sub}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap gap-3"
              >
                <Button size="lg" className="rounded-full font-bold px-8 gap-2 group">
                  Shop Now
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button size="lg" variant="outline" className="rounded-full font-bold px-8">
                  View Deals
                </Button>
              </motion.div>
            </div>

            {/* Right — image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, x: 40 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="relative hidden lg:flex items-center justify-center"
            >
              <div className="w-full aspect-4/3 rounded-3xl overflow-hidden shadow-2xl border border-white/40 bg-white/20 backdrop-blur-sm">
                {images[slide.query] ? (
                  <Image
                    src={images[slide.query]}
                    alt={slide.headline.join(" ")}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-linear-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-primary/20 animate-pulse" />
                  </div>
                )}
              </div>

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7, type: "spring" }}
                className="absolute -top-4 -left-4 bg-background rounded-2xl px-4 py-3 shadow-xl border border-border flex items-center gap-2"
              >
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Today&apos;s Deal</p>
                  <p className="text-sm font-bold text-foreground">Save up to 40%</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, type: "spring" }}
                className="absolute -bottom-4 -right-4 bg-primary rounded-2xl px-4 py-3 shadow-xl text-primary-foreground"
              >
                <p className="text-xs font-medium opacity-80">{slide.badge}</p>
                <p className="text-xl font-black">30% OFF</p>
              </motion.div>
            </motion.div>
          </div>

          {/* Slide indicators */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === current ? "w-8 bg-primary" : "w-2 bg-primary/30"
                }`}
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Stats bar */}
      <div className="bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-3 divide-x divide-primary-foreground/20">
            {stats.map(({ icon: Icon, label, value }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center justify-center gap-3 py-2 px-4"
              >
                <div className="w-8 h-8 rounded-full bg-primary-foreground/10 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-primary-foreground" />
                </div>
                <div className="text-primary-foreground">
                  <p className="text-lg font-black leading-none">{value}</p>
                  <p className="text-xs opacity-75 hidden sm:block">{label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}