import React from "react";
import Banner from "@/components/Banner";
import BestSeller from "@/components/BestSeller";
import Category from "@/components/Category";
import NewsLetter from "@/components/NewsLetter";
import TrustBadges from "@/components/TrustBadges";
import Features from "@/components/Features";
import { useAppContext } from "@/context/AppContext";
import ProductCard from "@/components/ProductCard";

// New Section Component
const ProductSection = ({ title, subtitle, products }) => (
  <section className="bg-background-alt py-12 rounded-3xl border border-border px-4 sm:px-8">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-text-header">
          {title}
        </h2>
        <p className="text-base text-text-muted mt-2">
          {subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  </section>
);


const Home = () => {
  const { products } = useAppContext();

  // Sample data logic for new sections from existing products
  const trendingProducts = products.filter(p => p.inStock).slice(5, 10); // Next 5 products
  const newArrivals = products.filter(p => p.inStock).slice(10, 15); // Next 5 after that

  return (
    <div className="w-full bg-background">
      {/* Features Bar */}
      <Features />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-16 md:space-y-24">
        {/* Hero Section */}
        <section className="mt-6">
          <Banner />
        </section>

        {/* Trust Badges Section */}
        <section>
          <TrustBadges />
        </section>
        
        {/* Product Categories */}
        <section id="categories-section">
          <Category />
        </section>

        {/* Best Seller Products (already exists, now using the new component structure) */}
        <BestSeller />
        
        {/* NEW: Trending Now Section */}
        {trendingProducts.length > 0 && (
          <ProductSection 
            title="Trending Now"
            subtitle="Discover what's popular right now in our store."
            products={trendingProducts}
          />
        )}
        
        {/* NEW: New Arrivals Section */}
        {newArrivals.length > 0 && (
          <ProductSection 
            title="New Arrivals"
            subtitle="Freshly added to our collection, just for you."
            products={newArrivals}
          />
        )}

        {/* Newsletter Subscription */}
        <section>
          <NewsLetter />
        </section>
      </div>
    </div>
  );
};

export default Home;