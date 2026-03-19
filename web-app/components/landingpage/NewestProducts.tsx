"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductGrid } from "@/components/products/ProductGrid";
import { ProductGridState } from "@/components/products/ProductGridState";
import { useProducts } from "@/hooks/useProduct";

export default function NewestProducts() {
  const { data: products, isPending, isError } = useProducts();
  const newestProducts = products?.slice(-6) ?? [];

  return (
    <section className="bg-muted/30 py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="mb-1 text-sm font-bold uppercase tracking-widest text-primary">
              Just Arrived
            </p>
            <h2 className="text-3xl font-black text-foreground lg:text-4xl">
              Newest Products
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
              This section uses the same product card, image pattern, and routing as the
              rest of the storefront so everything feels organized.
            </p>
          </motion.div>

          <Button asChild variant="outline" className="hidden rounded-full sm:flex">
            <Link href="/products">
              View All
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {isPending ? (
          <ProductGridState
            title="Loading newest products"
            description="Newest items will show here once product data is ready."
          />
        ) : null}

        {isError ? (
          <ProductGridState
            title="Newest products unavailable"
            description="The product API is not responding right now, so this section could not load."
          />
        ) : null}

        {newestProducts.length ? (
          <ProductGrid
            products={newestProducts}
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"
          />
        ) : null}
      </div>
    </section>
  );
}
