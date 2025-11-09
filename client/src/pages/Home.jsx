import React from "react";
import BestSeller from "../components/BestSeller";
import Category from "../components/Category";
import TrustBadges from "../components/TrustBadges";
import Features from "../components/Features";
import { useAppContext } from "../context/AppContext";
import ProductCard from "../components/ProductCard";
import SpecialOffers from "../components/SpecialOffers";
import WhyChooseUs from "../components/WhyChooseUs";
import Testimonials from "../components/Testimonials";
import BrandStory from "../components/BrandStory";
import ParallaxBanner from "../components/ParallaxBanner";


const Home = () => {
  const { products } = useAppContext();
  
  const newArrivals = products.filter(p => p.inStock).slice(10, 15);

  return (
    // --- FIX: Added bg-background here to apply the gray background only below the Hero section. ---
    <div className="w-full bg-background space-y-16 md:space-y-24">
      
      <Features />
      <BrandStory />
      <section id="categories-section"> <Category /> </section>
      <BestSeller />
      <SpecialOffers />
      <ParallaxBanner />
      <WhyChooseUs />

      {newArrivals.length > 0 && (
        <div className="bg-surface py-12 rounded-2xl border border-border px-4 sm:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-text-header">New Arrivals</h2>
              <p className="text-base text-text-muted mt-2">Freshly added to our collection, just for you.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {newArrivals.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        </div>
      )}

      <Testimonials />
      <TrustBadges />

    </div>
  );
};

export default Home;