"use client";

import Image from "next/image";

export function ProductCard() {
  return (
    <div className="relative h-80 w-64 overflow-hidden rounded-xl border border-border bg-muted">
      <Image
        src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308"
        alt="Premium Headphones"
        fill
        className="object-cover transition-transform duration-300 hover:scale-105"
        sizes="(max-width: 768px) 100vw, 33vw"
      />
    </div>
  );
}
