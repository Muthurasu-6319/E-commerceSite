import React from 'react';

const FeatureItem = ({ icon, text }) => (
    <div className="flex items-center gap-3 bg-white py-2 px-4 rounded-full shadow-sm border border-border">
        <span className="text-green-600">{icon}</span>
        <span className="font-semibold text-text-header text-sm sm:text-base whitespace-nowrap">{text}</span>
    </div>
);

const Features = () => {
    // Using SVG checkmark icon for a clean look based on reference image 2
    const checkIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
        </svg>
    );

    return (
        <section className="bg-gradient-to-r from-background to-background-alt py-6 border-b border-border overflow-hidden">
            <div className="max-w-[1440px] mx-auto px-4">
                {/* Using flex-wrap and justify-center for a responsive layout */}
                <div className="flex flex-wrap items-center justify-center gap-4">
                    <FeatureItem icon={checkIcon} text="No Artificial Colors" />
                    <FeatureItem icon={checkIcon} text="100% Natural Ingredients" />
                    <FeatureItem icon={checkIcon} text="No Preservatives" />
                    <FeatureItem icon={checkIcon} text="Authentic Homemade Flavor" />
                    <FeatureItem icon={checkIcon} text="Pure & Hygienic" />
                </div>
            </div>
        </section>
    );
};

export default Features;