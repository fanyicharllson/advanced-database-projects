"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { useUnsplashImages } from "@/lib/useUnsplashImages";

interface BrowseItem {
  name: string;
  price: number;
  category: string;
  query: string;
}

interface ShopCategory {
  label: string;
  active: boolean;
}

const shopCategories: ShopCategory[] = [
  { label: "All Categories", active: true },
  { label: "Electronics", active: false },
  { label: "Fashion", active: false },
  { label: "Home & Garden", active: false },
  { label: "Sports", active: false },
];

const browseItems: BrowseItem[] = [
  {
    name: "Vintage Leather Briefcase",
    price: 89.99,
    category: "Bags",
    query: "leather briefcase brown vintage",
  },
  {
    name: "Men Smart Casual Outfit",
    price: 130.0,
    category: "Fashion",
    query: "men smart casual fashion",
  },
  {
    name: "Kids Winter Overalls",
    price: 58.0,
    category: "Kids",
    query: "kids winter clothing warm",
  },
  {
    name: "Minimalist Water Bottle",
    price: 35.0,
    category: "Accessories",
    query: "minimalist water bottle",
  },
  {
    name: "Portable Bluetooth Speaker",
    price: 79.99,
    category: "Electronics",
    query: "bluetooth speaker portable",
  },
  {
    name: "Yoga Mat Premium",
    price: 55.0,
    category: "Sports",
    query: "yoga mat fitness",
  },
];

export default function BrowseSection() {
  const [activeCategory, setActiveCategory] =
    useState<string>("All Categories");
  const images = useUnsplashImages(browseItems, "squarish");

  return (
    <section className="py-16 lg:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-muted-foreground text-sm mb-1">
              You&apos;re looking for{" "}
              <button className="inline-flex items-center gap-1 font-semibold text-foreground hover:text-primary transition-colors">
                All Categories <ChevronDown className="w-3 h-3" />
              </button>
            </p>
            <h2 className="text-3xl lg:text-4xl font-black text-foreground">
              Discover Everything
            </h2>
          </motion.div>

          <div className="flex gap-2 flex-wrap">
            {shopCategories.map((cat) => (
              <button
                key={cat.label}
                onClick={() => setActiveCategory(cat.label)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  activeCategory === cat.label
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-accent"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {browseItems.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              whileHover={{ y: -4 }}
              className="group cursor-pointer"
            >
              <div className="aspect-square rounded-2xl overflow-hidden bg-muted mb-3 relative">
                {images[item.name] ? (
                  <Image
                    src={images[item.name]}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-linear-to-br from-primary/10 to-muted animate-pulse" />
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
              </div>
              <p className="text-[10px] text-primary font-bold uppercase tracking-wide mb-0.5">
                {item.category}
              </p>
              <p className="text-sm font-semibold text-foreground line-clamp-1 mb-0.5 group-hover:text-primary transition-colors">
                {item.name}
              </p>
              <p className="text-sm font-black text-foreground">
                ${item.price}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
