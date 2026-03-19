
import { useQuery } from "@tanstack/react-query";
import {
  getFallbackProducts,
  normalizeProduct,
  type ProductRecord,
  type RawProduct,
} from "@/lib/products";

async function fetchProducts(): Promise<ProductRecord[]> {
  try {
    const response = await fetch("/api/products", {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Unable to load products");
    }

    const products = (await response.json()) as RawProduct[];
    return products.map((product) => normalizeProduct(product));
  } catch {
    return getFallbackProducts();
  }
}

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
}

export function useProduct(productId: number) {
  const productsQuery = useProducts();

  return {
    ...productsQuery,
    data: productsQuery.data?.find((product) => product.id === productId),
  };
}
