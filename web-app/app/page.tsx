import BrowseSection from "@/components/landingpage/Browsesection";
import Categories from "@/components/landingpage/Catergories";
import FeaturedProducts from "@/components/landingpage/FeaturedProducts";
import Footer from "@/components/landingpage/Footer";
import Hero from "@/components/landingpage/Hero";
import Navbar from "@/components/landingpage/NavBar";
import NewestProducts from "@/components/landingpage/NewestProducts";
import PromoBanners from "@/components/landingpage/PromoBanners";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Categories />
      <FeaturedProducts />
      <PromoBanners />
      <NewestProducts />
      <BrowseSection />
      <Footer />
    </main>
  );
}
