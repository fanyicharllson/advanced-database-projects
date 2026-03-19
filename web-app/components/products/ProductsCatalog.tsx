"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/hooks/useProduct";
import { ProductGrid } from "@/components/products/ProductGrid";
import { ProductGridState } from "@/components/products/ProductGridState";
import { type ProductRecord } from "@/lib/products";

interface ProductsCatalogProps {
  initialProducts?: ProductRecord[];
}

export function ProductsCatalog({ initialProducts = [] }: ProductsCatalogProps) {
  const { data, isPending, isError } = useProducts();
  const products = data?.length ? data : initialProducts;

  return (
    <section className="bg-background py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[2rem] border border-border bg-linear-to-br from-primary/8 via-background to-secondary/70">
          <div className="grid gap-8 px-6 py-10 lg:grid-cols-[1.2fr_0.8fr] lg:px-10">
            <div className="space-y-5">
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-primary">
                Product Collection
              </p>
              <div className="space-y-3">
                <h1 className="max-w-2xl text-4xl font-black tracking-tight text-foreground lg:text-5xl">
                  Shop every product in one organized storefront.
                </h1>
                <p className="max-w-2xl text-base text-muted-foreground">
                  The catalog is connected to your product records, keeps the card design
                  consistent with the landing page, and sends each item straight to its
                  own detailed page.
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.5rem] border border-border bg-card/90 p-5 shadow-sm">
                <p className="text-sm font-semibold text-muted-foreground">Available items</p>
                <p className="mt-3 text-3xl font-black text-foreground">{products.length}</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Pulled from the same backend data source used for product details.
                </p>
              </div>

              <div className="rounded-[1.5rem] border border-border bg-card/90 p-5 shadow-sm">
                <p className="text-sm font-semibold text-muted-foreground">Need a quick start?</p>
                <p className="mt-3 text-lg font-bold text-foreground">
                  Open any product card to view the full layout.
                </p>
                <Button asChild variant="outline" className="mt-4 rounded-full">
                  <Link href="/">
                    Back to Landing Page
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10">
          {isPending && !products.length ? (
            <ProductGridState
              title="Loading products"
              description="The catalog is fetching products from your API right now."
            />
          ) : null}

          {isError && !products.length ? (
            <ProductGridState
              title="Products could not be loaded"
              description="Check that your database connection is available, then refresh the page."
            />
          ) : null}

          {products.length ? (
            <ProductGrid
              products={products}
              className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4"
            />
          ) : null}

          {!products.length ? (
            <ProductGridState
              title="No products available yet"
              description="Once product records are added to the database, they will appear here automatically."
            />
          ) : null}
        </div>
      </div>
    </section>
  );
}
