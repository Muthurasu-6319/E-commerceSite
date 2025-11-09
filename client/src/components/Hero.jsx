import React from 'react';
import { useNavigate } from 'react-router-dom';
import { home5, home11, home14 } from "../assets/images/assets";

const Hero = () => {
  const navigate = useNavigate();

  return (
    // This is a full-width section now, with the green background. No rounding or overflow needed.
    <section className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center py-16 md:py-24">
          
          {/* Left Side: Text Content */}
          <div className="text-center lg:text-left">
            <span className="inline-block bg-accent text-white rounded-full px-4 py-1.5 text-sm font-bold tracking-wider mb-4">
              FRESH & ORGANIC
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">
              Welcome to <span className="text-accent">VinitaMart</span>
            </h1>
            <p className="text-lg text-gray-200 max-w-lg mx-auto lg:mx-0 mb-8">
              Discover the finest selection of authentic Indian groceries, spices, and organic products. Quality you can trust, delivered fresh to you.
            </p>
            <button 
              onClick={() => navigate("/products")}
              className="px-8 py-3 text-base sm:text-lg font-bold text-white bg-accent rounded-full shadow-lg hover:bg-accent-dark transition-all duration-300 transform hover:scale-105"
            >
              Shop All Products
            </button>
          </div>

          {/* Right Side: Image Collage */}
          <div className="hidden lg:flex items-center justify-center h-full">
             <div className="relative w-full max-w-lg h-96">
                <img 
                  src={home11} 
                  alt="Healthy food" 
                  className="absolute top-0 left-0 w-2/3 h-auto object-cover rounded-2xl shadow-2xl transform -rotate-6 transition-transform duration-300 hover:rotate-0 hover:scale-105"
                />
                <img 
                  src={home14} 
                  alt="Spices" 
                  className="absolute bottom-0 right-0 w-3/5 h-auto object-cover rounded-2xl shadow-2xl transform rotate-3 transition-transform duration-300 hover:rotate-0 hover:scale-105"
                />
                 <img 
                  src={home5} 
                  alt="Organic products" 
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-auto object-cover rounded-2xl shadow-2xl transform rotate-8 transition-transform duration-300 hover:rotate-0 hover:scale-105 z-10"
                />
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;