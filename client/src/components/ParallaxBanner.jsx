import React from 'react';
import { home5 } from '../assets/images/assets';

const ParallaxBanner = () => {
  return (
    <div 
      className="py-24 md:py-32 bg-cover bg-center bg-fixed rounded-2xl" 
      style={{ backgroundImage: `url(${home5})` }}
      aria-labelledby="parallax-title"
    >
      {/* --- FIX: REMOVED the bg-black/50 overlay div that was causing the dim effect --- */}
      {/* <div className="absolute inset-0 bg-black/50 rounded-2xl"></div> */}

      {/* The text container is now directly on the parallax background */}
      <div className="relative max-w-4xl mx-auto text-center text-white px-4">
        <h2 
          id="parallax-title" 
          className="text-3xl md:text-5xl font-extrabold mb-4"
          // --- NEW: Added text shadow to make text pop against the image ---
          style={{ textShadow: '2px 2px 8px rgba(0, 0, 0, 0.7)' }}
        >
          Taste the Tradition
        </h2>
        <p 
          className="text-lg md:text-xl text-gray-200"
          // --- NEW: Added text shadow here too for consistency ---
          style={{ textShadow: '1px 1px 6px rgba(0, 0, 0, 0.7)' }}
        >
          Every spice blend and health mix is a testament to our commitment to quality and authenticity.
        </p>
      </div>
    </div>
  );
};

export default ParallaxBanner;