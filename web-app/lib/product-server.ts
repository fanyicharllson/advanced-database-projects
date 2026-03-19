import { prisma } from "@/lib/prisma";
import {
  getFallbackProducts,
  normalizeProduct,
  type ProductRecord,
} from "@/lib/products";

const productInclude = {
  currency: true,
  inventory: {
    include: {
      warehouse: true,
    },
  },
  product_attributes: {
    include: {
      attribute: true,
    },
  },
} as const;

export async function getAllProducts(): Promise<ProductRecord[]> {
  try {
    const products = await prisma.product.findMany({
      include: productInclude,
      orderBy: {
        product_id: "asc",
      },
    });

    return products.map((product) => normalizeProduct(product));
  } catch {
    return getFallbackProducts();
  }
}

export async function getProductById(id: number): Promise<ProductRecord | null> {
  try {
    const product = await prisma.product.findUnique({
      where: { product_id: id },
      include: productInclude,
    });

    return product ? normalizeProduct(product) : null;
  } catch {
    return getFallbackProducts().find((product) => product.id === id) ?? null;
  }
}

export async function getRelatedProducts(
  product: ProductRecord,
): Promise<ProductRecord[]> {
  try {
    const products = await prisma.product.findMany({
      where: {
        product_id: {
          not: product.id,
        },
        category: product.category,
      },
      include: productInclude,
      take: 4,
    });

    if (products.length >= 4) {
      return products.map((item) => normalizeProduct(item));
    }

    const fallbackProducts = await prisma.product.findMany({
      where: {
        product_id: {
          not: product.id,
        },
      },
      include: productInclude,
      orderBy: {
        product_id: "asc",
      },
      take: 4,
    });

    return fallbackProducts.map((item) => normalizeProduct(item));
  } catch {
    return getFallbackProducts()
      .filter((item) => item.id !== product.id)
      .filter((item) => item.category === product.category)
      .slice(0, 4);
  }
}
