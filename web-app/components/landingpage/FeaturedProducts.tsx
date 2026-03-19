"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductGrid } from "@/components/products/ProductGrid";
import { ProductGridState } from "@/components/products/ProductGridState";
import { useProducts } from "@/hooks/useProduct";

export default function FeaturedProducts() {
  const { data: products, isPending, isError } = useProducts();
  const featuredProducts = products?.slice(0, 6) ?? [];

  return (
    <section className="bg-muted/30 py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="mb-1 text-sm font-bold uppercase tracking-widest text-primary">
              Don&apos;t Miss
            </p>
            <h2 className="text-3xl font-black text-foreground lg:text-4xl">
              Featured Products
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
              These products now reuse one shared card design, so the landing page and
              product pages stay consistent across the app.
            </p>
          </motion.div>
        </div>

        {isPending ? (
          <ProductGridState
            title="Loading featured products"
            description="Featured items will appear here as soon as the products API responds."
          />
        ) : null}

        {isError ? (
          <ProductGridState
            title="Featured products unavailable"
            description="Connect your database first, then refresh this page and the featured products will load here."
          />
        ) : null}

        {featuredProducts.length ? (
          <ProductGrid
            products={featuredProducts}
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"
          />
        ) : null}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <Button asChild variant="outline" size="lg" className="rounded-full px-8 font-bold">
            <Link href="/products">
              View All Products
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
