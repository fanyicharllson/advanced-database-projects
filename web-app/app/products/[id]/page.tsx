import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Footer from "@/components/landingpage/Footer";
import Navbar from "@/components/landingpage/NavBar";
import { ProductDetailsView } from "@/components/products/ProductDetailsView";
import {
  getProductById,
  getRelatedProducts,
} from "@/lib/product-server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(Number(id));

  if (!product) {
    return {
      title: "Product Not Found | GlobalMart",
    };
  }

  return {
    title: `${product.name} | GlobalMart`,
    description: product.shortDescription,
  };
}

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductById(Number(id));

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(product);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <ProductDetailsView
        product={product}
        relatedProducts={relatedProducts}
      />
      <Footer />
    </main>
  );
}
