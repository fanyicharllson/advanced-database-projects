"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, Heart, ShoppingCart, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatPrice, type ProductRecord } from "@/lib/products";

interface ProductCardProps {
  product: ProductRecord;
  image?: string;
  index?: number;
  className?: string;
}

export function ProductCard({
  product,
  image,
  className,
}: ProductCardProps) {
  const [wished, setWished] = useState(false);
  const discount = Math.max(
    0,
    Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100),
  );

  return (
    <article
      className={cn(
        "group overflow-hidden rounded-[1.75rem] border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10",
        className,
      )}
    >
      <div className="relative aspect-square overflow-hidden bg-muted">
        <Link
          href={`/products/${product.id}`}
          className="absolute inset-0 z-10"
          aria-label={`View ${product.name}`}
        />

        {image ? (
          <Image
            src={image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
          />
        ) : (
          <div className="h-full w-full bg-linear-to-br from-primary/10 via-background to-secondary/60" />
        )}

        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          {product.badge ? <Badge className="rounded-full px-3">{product.badge}</Badge> : null}
          {discount > 0 ? (
            <Badge variant="secondary" className="rounded-full px-3">
              -{discount}%
            </Badge>
          ) : null}
        </div>

        <button
          type="button"
          onClick={() => setWished((value) => !value)}
          className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/50 bg-background/90 text-muted-foreground backdrop-blur transition hover:text-rose-500"
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={cn("h-4 w-4", wished && "fill-rose-500 text-rose-500")} />
        </button>

        <div className="absolute inset-0 bg-black/0 transition duration-300 group-hover:bg-black/5" />
      </div>

      <div className="space-y-4 p-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/80">
              {product.category}
            </p>
            <p className="text-xs text-muted-foreground">{product.stockLabel}</p>
          </div>

          <div>
            <Link
              href={`/products/${product.id}`}
              className="line-clamp-1 text-base font-bold text-foreground transition hover:text-primary"
            >
              {product.name}
            </Link>
            <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
              {product.shortDescription}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          {[...Array(5)].map((_, index) => (
            <Star
              key={`${product.id}-${index}`}
              className={cn(
                "h-4 w-4",
                index < Math.round(product.rating)
                  ? "fill-amber-400 text-amber-400"
                  : "text-muted-foreground/40",
              )}
            />
          ))}
          <span className="ml-1 font-medium text-foreground">{product.rating}</span>
          <span>({product.reviews.toLocaleString()})</span>
        </div>

        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-xl font-black text-foreground">{formatPrice(product)}</p>
            {discount > 0 ? (
              <p className="text-xs text-muted-foreground line-through">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: product.currencyCode || "USD",
                }).format(product.originalPrice)}
              </p>
            ) : null}
          </div>
          <p className="text-xs text-muted-foreground">
            {product.stockCount} units available
          </p>
        </div>

        <div className="flex gap-2 pt-1">
          <Button asChild className="flex-1 rounded-full font-semibold">
            <Link href={`/products/${product.id}`}>
              <Eye className="h-4 w-4" />
              View Product
            </Link>
          </Button>
          <Button
            type="button"
            size="icon"
            variant="secondary"
            className="rounded-full"
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </article>
  );
}
