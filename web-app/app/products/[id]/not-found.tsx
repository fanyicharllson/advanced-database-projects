import Link from "next/link";
import Footer from "@/components/landingpage/Footer";
import Navbar from "@/components/landingpage/NavBar";
import { Button } from "@/components/ui/button";

export default function ProductNotFound() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <section className="py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <div className="rounded-[2rem] border border-border bg-card px-6 py-14 shadow-sm">
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-primary">
              Product
            </p>
            <h1 className="mt-4 text-4xl font-black text-foreground">
              This product page could not be found
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground">
              The link may be wrong, or that product may no longer be available in the
              current catalog.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button asChild className="rounded-full">
                <Link href="/products">Browse Products</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full">
                <Link href="/">Back to Home</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
