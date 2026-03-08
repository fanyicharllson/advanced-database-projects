"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart, ShoppingCart, Star, Eye, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useUnsplashImages } from "@/lib/useUnsplashImages";


interface Product {
  name: string;
  price: number;
  original: number;
  rating: number;
  reviews: number;
  badge: string | null;
  query: string;
}

interface CountdownTime {
  h: number;
  m: number;
  s: number;
}

interface ProductCardProps {
  product: Product;
  image: string;
  index: number;
}

const productSeeds: Product[] = [
  { name: "Smart Watch Ultra", price: 299.99, original: 399.99, rating: 4.8, reviews: 2341, badge: "NEW", query: "smartwatch luxury" },
  { name: "iPhone 15 Case", price: 49.99, original: 79.99, rating: 4.6, reviews: 876, badge: "HOT", query: "smartphone accessories" },
  { name: "Running Shoes Pro", price: 129.99, original: 189.99, rating: 4.9, reviews: 5120, badge: "SALE", query: "running shoes sport" },
  { name: "Laptop Sleeve 15\"", price: 39.99, original: 59.99, rating: 4.5, reviews: 432, badge: null, query: "laptop bag modern" },
  { name: "Wireless Earbuds", price: 199.99, original: 249.99, rating: 4.7, reviews: 3210, badge: "HOT", query: "wireless earbuds" },
  { name: "MacBook Pro M3", price: 1999.99, original: 2299.99, rating: 5.0, reviews: 891, badge: "NEW", query: "macbook laptop" },
];

const badgeColor: Record<string, string> = {
  NEW: "bg-blue-500",
  HOT: "bg-rose-500",
  SALE: "bg-primary",
};

// Countdown timer
function useCountdown(hours = 12, minutes = 34, seconds = 56): CountdownTime {
  const [time, setTime] = useState<CountdownTime>({ h: hours, m: minutes, s: seconds });
  useEffect(() => {
    const t = setInterval(() => {
      setTime((prev) => {
        const { h, m, s } = prev;
        if (s > 0) return { h, m, s: s - 1 };
        if (m > 0) return { h, m: m - 1, s: 59 };
        if (h > 0) return { h: h - 1, m: 59, s: 59 };
        return { h: 0, m: 0, s: 0 };
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);
  return time;
}

function ProductCard({ product, image, index }: ProductCardProps) {
  const [wished, setWished] = useState(false);
  const discount = Math.round(((product.original - product.price) / product.original) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      whileHover={{ y: -6 }}
      className="group relative bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300"
    >
      {/* Image */}
      <div className="relative aspect-square bg-muted overflow-hidden">
        {image ? (
          <Image src={image} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full bg-linear-to-br from-primary/10 to-primary/5 animate-pulse" />
        )}

        {/* Overlays */}
        {product.badge && (
          <span className={`absolute top-3 left-3 ${badgeColor[product.badge]} text-white text-[10px] font-bold px-2 py-1 rounded-full`}>
            {product.badge}
          </span>
        )}
        {discount > 0 && (
          <span className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm text-foreground text-[10px] font-bold px-2 py-1 rounded-full border border-border">
            -{discount}%
          </span>
        )}

        {/* Hover actions */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <Button size="sm" className="rounded-full text-xs px-4 gap-1.5 shadow-lg">
            <ShoppingCart className="w-3 h-3" /> Add to Cart
          </Button>
          <Button size="icon" variant="secondary" className="rounded-full w-8 h-8 shadow-lg">
            <Eye className="w-3 h-3" />
          </Button>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-xs text-muted-foreground mb-1">GlobalMart Store</p>
        <h3 className="text-sm font-semibold text-foreground line-clamp-1 mb-2">{product.name}</h3>

        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-3 h-3 ${i < Math.floor(product.rating) ? "text-amber-400 fill-amber-400" : "text-muted-foreground"}`}
            />
          ))}
          <span className="text-xs text-muted-foreground ml-1">({product.reviews.toLocaleString()})</span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-base font-black text-foreground">${product.price}</span>
            <span className="text-xs text-muted-foreground line-through ml-2">${product.original}</span>
          </div>
          <button
            onClick={() => setWished(!wished)}
            className={`p-1.5 rounded-full transition-colors ${wished ? "text-rose-500" : "text-muted-foreground hover:text-rose-500"}`}
          >
            <Heart className={`w-4 h-4 ${wished ? "fill-rose-500" : ""}`} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function FeaturedProducts() {
  const images = useUnsplashImages(productSeeds, "squarish");
  const [activeTab, setActiveTab] = useState("All");
  const countdown = useCountdown(11, 47, 23);

  const tabs = ["All", "Electronics", "Fashion", "Home", "Sports"];

  return (
    <section className="py-16 lg:py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-1">Don&apos;t Miss</p>
            <h2 className="text-3xl lg:text-4xl font-black text-foreground">Featured Products</h2>
          </motion.div>

          {/* Countdown */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 bg-background border border-border rounded-2xl px-4 py-3"
          >
            <Timer className="w-4 h-4 text-primary shrink-0" />
            <span className="text-xs text-muted-foreground font-medium">Limited time only:</span>
            {[countdown.h, countdown.m, countdown.s].map((val, i) => (
              <span key={i} className="flex items-center gap-1">
                <span className="bg-primary text-primary-foreground text-xs font-black px-2 py-1 rounded-lg min-w-7 text-center tabular-nums">
                  {String(val).padStart(2, "0")}
                </span>
                {i < 2 && <span className="text-primary font-bold text-sm">:</span>}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                activeTab === tab
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
                  : "bg-background text-muted-foreground border border-border hover:border-primary/40"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {productSeeds.map((product, i) => (
            <ProductCard key={product.name} product={product} image={images[product.name]} index={i} />
          ))}
        </div>

        {/* View all */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Button variant="outline" size="lg" className="rounded-full px-10 font-bold border-primary/30 hover:border-primary hover:bg-primary/5">
            View All Products
          </Button>
        </motion.div>
      </div>
    </section>
  );
}