"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useUnsplashImages } from "@/lib/useUnsplashImages";



interface NewProduct {
  name: string;
  price: number;
  original: number;
  rating: number;
  query: string;
}

const newProducts: NewProduct[] = [
  {
    name: "Cotton Dress Outfit",
    price: 109.5,
    original: 130.0,
    rating: 4.7,
    query: "women fashion dress",
  },
  {
    name: "Vintage Leather Bag",
    price: 89.99,
    original: 120.0,
    rating: 4.5,
    query: "leather handbag",
  },
  {
    name: "Kids Casual Set",
    price: 45.0,
    original: 60.0,
    rating: 4.9,
    query: "kids clothing colorful",
  },
  {
    name: "Men Denim Jacket",
    price: 139.99,
    original: 180.0,
    rating: 4.6,
    query: "men jacket fashion",
  },
  {
    name: "Sports Backpack",
    price: 79.99,
    original: 100.0,
    rating: 4.8,
    query: "sports backpack",
  },
  {
    name: "Formal Blazer",
    price: 199.99,
    original: 250.0,
    rating: 4.4,
    query: "formal blazer suit",
  },
];

export default function NewestProducts() {
  const [wished, setWished] = useState<Record<string, boolean>>({});
  const images = useUnsplashImages(newProducts, "squarish");

  return (
    <section className="py-16 lg:py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-1">
              Just Arrived
            </p>
            <h2 className="text-3xl lg:text-4xl font-black text-foreground">
              Newest Products
            </h2>
          </motion.div>
          <Button
            variant="outline"
            className="rounded-full text-sm font-semibold border-primary/30 hover:border-primary hidden sm:flex"
          >
            View All
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {newProducts.map((product, i) => {
            const discount = Math.round(
              ((product.original - product.price) / product.original) * 100,
            );
            return (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                whileHover={{ y: -4 }}
                className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
              >
                <div className="relative aspect-square bg-muted overflow-hidden">
                  {images[product.name] ? (
                    <Image
                      src={images[product.name]}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-linear-to-br from-primary/10 to-muted animate-pulse" />
                  )}
                  <span className="absolute top-2 right-2 bg-primary text-primary-foreground text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    -{discount}%
                  </span>
                  <button
                    onClick={() =>
                      setWished((p) => ({
                        ...p,
                        [product.name]: !p[product.name],
                      }))
                    }
                    className="absolute top-2 left-2 w-7 h-7 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Heart
                      className={`w-3 h-3 ${wished[product.name] ? "fill-rose-500 text-rose-500" : "text-muted-foreground"}`}
                    />
                  </button>
                </div>
                <div className="p-3">
                  <p className="text-xs font-semibold text-foreground line-clamp-1 mb-1">
                    {product.name}
                  </p>
                  <div className="flex items-center gap-0.5 mb-2">
                    {[...Array(5)].map((_, j) => (
                      <Star
                        key={j}
                        className={`w-2.5 h-2.5 ${j < Math.floor(product.rating) ? "text-amber-400 fill-amber-400" : "text-muted"}`}
                      />
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-black text-foreground">
                        ${product.price}
                      </p>
                      <p className="text-[10px] text-muted-foreground line-through">
                        ${product.original}
                      </p>
                    </div>
                    <button className="w-7 h-7 rounded-full bg-primary/10 hover:bg-primary hover:text-primary-foreground text-primary flex items-center justify-center transition-colors">
                      <ShoppingCart className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
