import React from 'react';

// You can replace these with actual SVG components if you have them
const FeatureIcon = ({ children }) => (
  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-primary/10 text-primary rounded-full">
    {children}
  </div>
);

const WhyChooseUs = () => {
  return (
    <section className="py-16 bg-white">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-text">
          Why Shop With Vinitamart?
        </h2>
        <p className="text-base text-muted mt-2 max-w-2xl mx-auto">
          We provide the freshest products and a seamless shopping experience, making your life easier and healthier.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Feature 1 */}
        <div className="text-center p-6">
          <FeatureIcon>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </FeatureIcon>
          <h3 className="text-xl font-semibold text-text mt-4">Fast & On-Time Delivery</h3>
          <p className="text-muted mt-2">Get your groceries delivered to your doorstep exactly when you need them. We value your time.</p>
        </div>
        {/* Feature 2 */}
        <div className="text-center p-6">
          <FeatureIcon>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </FeatureIcon>
          <h3 className="text-xl font-semibold text-text mt-4">Quality Guaranteed</h3>
          <p className="text-muted mt-2">We source directly from trusted farms and brands to ensure you get the freshest and highest quality products.</p>
        </div>
        {/* Feature 3 */}
        <div className="text-center p-6">
          <FeatureIcon>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 6.75z" /></svg>
          </FeatureIcon>
          <h3 className="text-xl font-semibold text-text mt-4">Dedicated Support</h3>
          <p className="text-muted mt-2">Our support team is always ready to help you with any questions or concerns about your orders.</p>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;