"use client";

import { ProductCard } from "@/components/ProductCard";
import { useUnsplashImages } from "@/lib/useUnsplashImages";
import { type ProductRecord } from "@/lib/products";

interface ProductGridProps {
  products: ProductRecord[];
  className?: string;
}

export function ProductGrid({ products, className }: ProductGridProps) {
  const images = useUnsplashImages(
    products.map((product) => ({
      name: product.name,
      query: product.imageQuery,
    })),
    "squarish",
  );

  return (
    <div className={className}>
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          image={images[product.name]}
          index={index}
        />
      ))}
    </div>
  );
}
