import Footer from "@/components/landingpage/Footer";
import Navbar from "@/components/landingpage/NavBar";
import { ProductsCatalog } from "@/components/products/ProductsCatalog";
import { getAllProducts } from "@/lib/product-server";

export default async function ProductsPage() {
  const products = await getAllProducts();

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <ProductsCatalog initialProducts={products} />
      <Footer />
    </main>
  );
}
