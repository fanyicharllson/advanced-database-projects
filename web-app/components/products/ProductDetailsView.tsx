"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  Heart,
  ShieldCheck,
  ShoppingCart,
  Star,
  Store,
  Truck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProductGrid } from "@/components/products/ProductGrid";
import { ProductGridState } from "@/components/products/ProductGridState";
import { formatPrice, type ProductRecord } from "@/lib/products";
import { useUnsplashImages } from "@/lib/useUnsplashImages";

interface ProductDetailsViewProps {
  product: ProductRecord;
  relatedProducts: ProductRecord[];
}

export function ProductDetailsView({
  product,
  relatedProducts,
}: ProductDetailsViewProps) {
  const [quantity, setQuantity] = useState(1);

  const galleryItems = useMemo(
    () => [
      { name: product.name, query: product.imageQuery, orientation: "squarish" as const },
      {
        name: `${product.name}-alt-1`,
        query: `${product.imageQuery} premium close up`,
        orientation: "squarish" as const,
      },
      {
        name: `${product.name}-alt-2`,
        query: `${product.imageQuery} lifestyle`,
        orientation: "squarish" as const,
      },
    ],
    [product.imageQuery, product.name],
  );

  const gallery = useUnsplashImages(galleryItems, "squarish");
  const mainImage = gallery[product.name];

  return (
    <div className="bg-background">
      <section className="border-b border-border bg-linear-to-b from-primary/5 via-background to-background">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="transition hover:text-primary">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/products" className="transition hover:text-primary">
              Products
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">{product.name}</span>
          </div>
        </div>
      </section>

      <section className="py-10 lg:py-14">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr_0.72fr] lg:px-8">
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card shadow-sm">
              <div className="absolute left-4 top-4 z-10 flex flex-wrap gap-2">
                {product.badge ? <Badge className="rounded-full px-3">{product.badge}</Badge> : null}
                <Badge variant="secondary" className="rounded-full px-3">
                  {product.category}
                </Badge>
              </div>

              <div className="relative aspect-square bg-muted">
                {mainImage ? (
                  <Image
                    src={mainImage}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                ) : (
                  <div className="h-full w-full bg-linear-to-br from-primary/10 via-background to-secondary/60" />
                )}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {galleryItems.map((item) => (
                <div
                  key={item.name}
                  className="relative aspect-square overflow-hidden rounded-[1.25rem] border border-border bg-card"
                >
                  {gallery[item.name] ? (
                    <Image
                      src={gallery[item.name]}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 33vw, 12vw"
                    />
                  ) : (
                    <div className="h-full w-full bg-muted" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-primary">
                GlobalMart Choice
              </p>
              <div>
                <h1 className="text-3xl font-black tracking-tight text-foreground lg:text-4xl">
                  {product.name}
                </h1>
                <p className="mt-3 text-base leading-7 text-muted-foreground">
                  {product.description}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 rounded-[1.5rem] border border-border bg-card p-4">
              <div className="flex items-center gap-1 text-sm">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={`${product.id}-detail-${index}`}
                    className={
                      index < Math.round(product.rating)
                        ? "h-4 w-4 fill-amber-400 text-amber-400"
                        : "h-4 w-4 text-muted-foreground/40"
                    }
                  />
                ))}
                <span className="ml-2 font-semibold text-foreground">{product.rating}</span>
              </div>
              <span className="text-sm text-muted-foreground">
                {product.reviews.toLocaleString()} verified reviews
              </span>
              <span className="text-sm font-semibold text-emerald-600">
                {product.stockLabel}
              </span>
            </div>

            <div className="rounded-[1.5rem] border border-border bg-card p-6 shadow-sm">
              <div className="flex items-end gap-3">
                <p className="text-4xl font-black text-foreground">{formatPrice(product)}</p>
                <p className="pb-1 text-sm text-muted-foreground line-through">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: product.currencyCode || "USD",
                  }).format(product.originalPrice)}
                </p>
              </div>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Price includes standard marketplace support, protected checkout, and
                inventory visibility across your available warehouses.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.5rem] border border-border bg-card p-5">
                <div className="flex items-center gap-3">
                  <Truck className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-semibold text-foreground">Fast dispatch</p>
                    <p className="text-sm text-muted-foreground">
                      Ships from stocked warehouses with tracked delivery.
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-[1.5rem] border border-border bg-card p-5">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-semibold text-foreground">Secure purchase</p>
                    <p className="text-sm text-muted-foreground">
                      Protected checkout and dependable order processing.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-border bg-card p-6">
              <h2 className="text-lg font-bold text-foreground">Product Highlights</h2>
              <div className="mt-4 grid gap-3">
                {product.highlights.map((highlight) => (
                  <div
                    key={highlight}
                    className="rounded-2xl border border-border bg-muted/40 px-4 py-3 text-sm text-muted-foreground"
                  >
                    {highlight}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-border bg-card p-6">
              <h2 className="text-lg font-bold text-foreground">Specifications</h2>
              <div className="mt-4 grid gap-3">
                {(product.attributes.length
                  ? product.attributes
                  : [
                      { name: "Category", value: product.category },
                      { name: "Currency", value: product.currencyCode },
                      { name: "Availability", value: product.stockLabel },
                    ]
                ).map((attribute) => (
                  <div
                    key={`${attribute.name}-${attribute.value}`}
                    className="flex items-center justify-between gap-4 rounded-2xl border border-border px-4 py-3 text-sm"
                  >
                    <span className="font-medium text-foreground">{attribute.name}</span>
                    <span className="text-muted-foreground">{attribute.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="h-fit rounded-[2rem] border border-border bg-card p-6 shadow-lg shadow-primary/5">
            <div className="space-y-5">
              <div>
                <p className="text-sm text-muted-foreground">Deal Price</p>
                <p className="mt-1 text-3xl font-black text-foreground">{formatPrice(product)}</p>
                <p className="mt-2 text-sm text-emerald-600">{product.stockLabel}</p>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-semibold text-foreground">Quantity</p>
                <div className="flex items-center gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="rounded-full"
                    onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                  >
                    -
                  </Button>
                  <div className="flex h-11 min-w-14 items-center justify-center rounded-full border border-border px-4 font-semibold text-foreground">
                    {quantity}
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="rounded-full"
                    onClick={() => setQuantity((value) => value + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>

              <div className="grid gap-3">
                <Button className="h-12 rounded-full text-sm font-bold">
                  <ShoppingCart className="h-4 w-4" />
                  Add to Cart
                </Button>
                <Button variant="outline" className="h-12 rounded-full text-sm font-bold">
                  Buy Now
                </Button>
                <Button variant="ghost" className="h-11 rounded-full text-sm font-semibold">
                  <Heart className="h-4 w-4" />
                  Save for Later
                </Button>
              </div>

              <div className="rounded-[1.5rem] bg-muted/40 p-4">
                <div className="flex items-start gap-3">
                  <Store className="mt-0.5 h-4 w-4 text-primary" />
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p className="font-semibold text-foreground">Warehouse coverage</p>
                    <p>
                      {product.warehouseLocations.length
                        ? product.warehouseLocations.join(", ")
                        : "Warehouse information will appear here when inventory locations are available."}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3 rounded-[1.5rem] border border-border p-4">
                <p className="font-semibold text-foreground">Order confidence</p>
                <p className="text-sm text-muted-foreground">
                  Inventory is tracked live from your database, so this page can scale with
                  real stock and warehouse data later.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-t border-border bg-muted/20 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-primary">
                More to Explore
              </p>
              <h2 className="mt-2 text-3xl font-black text-foreground">
                Related products
              </h2>
            </div>
            <Button asChild variant="outline" className="rounded-full">
              <Link href="/products">View full catalog</Link>
            </Button>
          </div>

          {relatedProducts.length ? (
            <ProductGrid
              products={relatedProducts}
              className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4"
            />
          ) : (
            <ProductGridState
              title="No related products yet"
              description="More suggestions will appear here as more catalog items are added."
            />
          )}
        </div>
      </section>
    </div>
  );
}
