"use client";

import { motion } from "framer-motion";
import {
  Mail,
  Send,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  CreditCard,
  Shield,
  Truck,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import React from "react";

interface TrustBadge {
  icon: React.ElementType;
  label: string;
  sub: string;
}

const footerLinks: Record<string, string[]> = {
  Company: ["About Us", "Careers", "Press", "Blog", "Contact"],
  Support: [
    "Help Center",
    "Order Status",
    "Returns",
    "Shipping Info",
    "Size Guide",
  ],
  Categories: ["Electronics", "Fashion", "Home & Living", "Sports", "Beauty"],
  Legal: [
    "Privacy Policy",
    "Terms of Service",
    "Cookie Policy",
    "Accessibility",
  ],
};

const trustBadges: TrustBadge[] = [
  { icon: Truck, label: "Free Shipping", sub: "Orders over $50" },
  { icon: RefreshCw, label: "Easy Returns", sub: "30-day policy" },
  { icon: Shield, label: "Secure Payment", sub: "256-bit SSL" },
  { icon: CreditCard, label: "Multi-Currency", sub: "Live exchange rates" },
];

export default function Footer() {
  return (
    <>
      {/* Trust badges */}
      <section className="bg-muted/50 border-y border-border py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustBadges.map(({ icon: Icon, label, sub }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">{label}</p>
                  <p className="text-xs text-muted-foreground">{sub}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-white rounded-full blur-2xl" />
        </div>
        <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="w-12 h-12 rounded-full bg-primary-foreground/10 flex items-center justify-center mx-auto mb-4">
              <Mail className="w-5 h-5 text-primary-foreground" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-black text-primary-foreground mb-3">
              Stay in the Loop
            </h2>
            <p className="text-primary-foreground/75 mb-8 text-sm">
              Get exclusive deals, new arrivals, and VIP offers delivered
              straight to your inbox.
            </p>
            <div className="flex gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address..."
                className="flex-1 bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 rounded-full px-5 py-3 text-sm outline-none focus:border-primary-foreground/50 focus:ring-2 focus:ring-primary-foreground/20 transition-all"
              />
              <Button
                variant="secondary"
                className="rounded-full px-5 gap-2 font-bold shrink-0 hover:bg-primary-foreground hover:text-primary"
              >
                <Send className="w-4 h-4" />
                Subscribe
              </Button>
            </div>
            <p className="text-primary-foreground/50 text-xs mt-3">
              No spam. Unsubscribe anytime.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-border pt-14 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
            {/* Brand */}
            <div className="col-span-2">
              <a href="#" className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-black text-sm">
                    G
                  </span>
                </div>
                <span className="text-xl font-black tracking-tight">
                  Global<span className="text-primary">Mart</span>
                </span>
              </a>
              <p className="text-muted-foreground text-sm leading-relaxed mb-5 max-w-xs">
                Your global marketplace for electronics, fashion, home goods,
                and more — shipped worldwide with live currency pricing.
              </p>
              <div className="flex gap-3">
                {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Links */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <p className="text-sm font-black text-foreground mb-4">
                  {title}
                </p>
                <ul className="flex flex-col gap-2">
                  {links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} GlobalMart. All rights reserved.
              Advanced Database Systems — Course Project.
            </p>
            <div className="flex items-center gap-2">
              {["Visa", "MC", "PayPal", "Stripe"].map((brand) => (
                <span
                  key={brand}
                  className="text-[10px] font-bold px-2 py-1 border border-border rounded text-muted-foreground"
                >
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
