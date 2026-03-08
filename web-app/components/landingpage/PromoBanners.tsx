"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useUnsplashImages } from "@/lib/useUnsplashImages";

interface Banner {
  tag: string;
  title: string;
  sub: string;
  query: string;
  gradient: string;
  light: boolean;
}

const banners: Banner[] = [
  {
    tag: "Special Offer",
    title: "Formula Sales",
    sub: "Discover curated collections with exclusive discounts.",
    query: "luxury fashion product",
    gradient: "from-purple-600 to-violet-800",
    light: false,
  },
  {
    tag: "Flash Deal",
    title: "Office Collection",
    sub: "Premium furniture for productive workspaces.",
    query: "office chair furniture",
    gradient: "from-slate-100 to-gray-200",
    light: true,
  },
  {
    tag: "New Drop",
    title: "Kids Everyday",
    sub: "Fun, safe, and stylish gear for little ones.",
    query: "colorful kids toys",
    gradient: "from-amber-400 to-orange-500",
    light: false,
  },
];

const bannerItems = banners.map((b) => ({ name: b.title, query: b.query }));

export default function PromoBanners() {
  const images = useUnsplashImages(bannerItems, "landscape");

  return (
    <section className="py-16 lg:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">Exclusive</p>
          <h2 className="text-3xl lg:text-4xl font-black text-foreground">Hot Promotions</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {banners.map((banner, i) => (
            <motion.div
              key={banner.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4, scale: 1.01 }}
              className="relative rounded-3xl overflow-hidden cursor-pointer group aspect-4/3"
            >
              {/* Background image */}
              {images[banner.title] && (
                <Image
                  src={images[banner.title]}
                  alt={banner.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              )}

              {/* Gradient overlay */}
              <div className={`absolute inset-0 bg-linear-to-t ${banner.light ? "from-black/60 via-black/20" : "from-black/70 via-black/30"} to-transparent`} />
              <div className={`absolute inset-0 bg-linear-to-br ${banner.gradient} opacity-60`} />

              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <p className={`text-xs font-bold uppercase tracking-widest mb-1 ${banner.light ? "text-white/80" : "text-white/80"}`}>
                  {banner.tag}
                </p>
                <h3 className="text-2xl font-black text-white mb-1">{banner.title}</h3>
                <p className="text-sm text-white/75 mb-4 line-clamp-2">{banner.sub}</p>
                <Button
                  size="sm"
                  variant="secondary"
                  className="w-fit rounded-full gap-1.5 font-semibold text-xs group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                >
                  Shop Now <ArrowRight className="w-3 h-3" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}