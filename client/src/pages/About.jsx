import React from "react";

const ValueCard = ({ icon, title, text }) => (
  <div className="bg-background-alt p-6 rounded-lg border border-border text-center">
    <div className="flex justify-center items-center w-16 h-16 mx-auto mb-4 bg-accent/50 text-primary rounded-full">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-text-header mb-2">{title}</h3>
    <p className="text-text-muted">{text}</p>
  </div>
);

export default function About() {
  return (
    <div className="py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16">
          <span className="inline-block bg-accent text-primary rounded-full px-4 py-1.5 text-sm font-semibold tracking-wider mb-4">
            ABOUT VINITAMART
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-text-header mb-4">
            Authentic Taste, Natural Goodness.
          </h1>
          <p className="text-lg text-text-body max-w-3xl mx-auto">
            At Vinitamart, we believe that health and taste go hand in hand. From traditional spice powders to nutritious health mixes, every product is made with handpicked ingredients and time-tested recipes.
          </p>
        </div>

        {/* Our Values Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <ValueCard 
            icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h6M9 11.25h6M9 15.75h6" /></svg>}
            title="Tradition"
            text="Honoring timeless recipes passed down through generations."
          />
           <ValueCard 
            icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>}
            title="Purity"
            text="Using only 100% natural ingredients with no preservatives."
          />
           <ValueCard 
            icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
            title="Quality"
            text="Ensuring freshness and excellence in every single spoonful."
          />
           <ValueCard 
            icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-3.152a.563.563 0 00-.652 0l-4.725 3.152a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" /></svg>}
            title="Trust"
            text="Building a transparent and lasting relationship with you."
          />
        </div>

        {/* Story Section */}
        <div className="text-center">
            <h2 className="text-3xl font-bold text-text-header mb-4">Our Story</h2>
            <p className="text-text-body leading-relaxed max-w-3xl mx-auto">
            Vinitamart started as a small family passion to bring authentic Indian flavors to Vietnam. What began in a home kitchen has now grown into a trusted brand, but our core philosophy remains the same: create healthy, flavorful moments every day. Whether it's enhancing your favorite dish with our rich, aromatic spices or enjoying a wholesome drink with our malt and millet mixes, Vinitamart is your trusted partner in the kitchen. With us, you don’t just cook—you create.
            </p>
        </div>
      </div>
    </div>
  );
}