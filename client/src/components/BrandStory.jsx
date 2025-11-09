import React from 'react';
import { home11, home14 } from "../assets/images/assets"; // Re-using our best images

const BrandStory = () => {
  return (
    <section className="w-full">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          
          {/* --- UPDATED: Image Showcase --- */}
          {/* Using a simple, elegant grid for images. It's more responsive. */}
          <div className="grid grid-cols-2 gap-4">
            <div className="pt-12"> {/* Pushing the first image down a bit */}
              <img 
                src={home14}
                alt="Natural Ingredients"
                className="w-full h-auto object-cover rounded-2xl shadow-lg"
              />
            </div>
            <div>
               <img 
                src={home11}
                alt="Homemade Quality"
                className="w-full h-auto object-cover rounded-2xl shadow-lg"
              />
            </div>
          </div>

          {/* Right Side: Text Content (No changes needed here) */}
          <div className="text-center lg:text-left">
            <span className="text-primary font-semibold tracking-wider uppercase">Our Promise</span>
            <h2 className="text-3xl md:text-4xl font-bold text-text-header mt-2 mb-4">
              From Our Kitchen to Yours
            </h2>
            <p className="text-text-body mb-6">
              Every product at VinitaMart is crafted with passion, using traditional recipes and the purest ingredients. We skip the preservatives and artificial additives to bring you the authentic, wholesome taste of home.
            </p>
            <div className="space-y-4">
              <FeatureItem text="100% Natural Ingredients" />
              <FeatureItem text="Authentic Homemade Flavor" />
              <FeatureItem text="No Preservatives or Additives" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Helper component for features (No changes needed here)
const FeatureItem = ({ text }) => (
  <div className="flex items-center justify-center lg:justify-start gap-3">
    <svg className="w-6 h-6 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <span className="font-semibold text-text-header">{text}</span>
  </div>
);

export default BrandStory;