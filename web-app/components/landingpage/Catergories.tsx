"use client";

import { motion, type Variants } from "framer-motion";
import {
  Smartphone,
  Shirt,
  Home,
  Dumbbell,
  Sparkles,
  Baby,
  Watch,
  BookOpen,
} from "lucide-react";

import React from "react";

interface Category {
  label: string;
  icon: React.ElementType;
  color: string;
}

const categories: Category[] = [
  {
    label: "Gadget & Mobile",
    icon: Smartphone,
    color: "bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400",
  },
  {
    label: "Gaming & Sports",
    icon: Dumbbell,
    color:
      "bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400",
  },
  {
    label: "Home Appliance",
    icon: Home,
    color:
      "bg-orange-50 dark:bg-orange-950/30 text-orange-600 dark:text-orange-400",
  },
  {
    label: "Furniture & Decor",
    icon: BookOpen,
    color:
      "bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400",
  },
  {
    label: "Fashion & Style",
    icon: Shirt,
    color: "bg-pink-50 dark:bg-pink-950/30 text-pink-600 dark:text-pink-400",
  },
  {
    label: "Baby & Kids",
    icon: Baby,
    color:
      "bg-yellow-50 dark:bg-yellow-950/30 text-yellow-600 dark:text-yellow-400",
  },
  {
    label: "Accessories",
    icon: Watch,
    color:
      "bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400",
  },
  {
    label: "Beauty & Care",
    icon: Sparkles,
    color: "bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400",
  },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
    },
  },
};

export default function Categories() {
  return (
    <section className="py-16 lg:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">
            Browse
          </p>
          <h2 className="text-3xl lg:text-4xl font-black text-foreground">
            Shop by Category
          </h2>
          <p className="text-muted-foreground mt-3 max-w-md mx-auto">
            This year, our new summer collection will shelter you from the harsh
            elements of a world that demands more.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4"
        >
          {categories.map(({ label, icon: Icon, color }) => (
            <motion.a
              key={label}
              href="#"
              variants={item}
              whileHover={{ y: -4, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex flex-col items-center gap-3 p-4 rounded-2xl border border-border bg-card hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group cursor-pointer"
            >
              <div
                className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-center text-foreground leading-tight">
                {label}
              </span>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
