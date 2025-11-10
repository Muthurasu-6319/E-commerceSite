import React from "react";
import TeamMemberCard from "../components/TeamMemberCard"; 
// --- FIX: Removed 'turmeric' and will re-use an existing professional image ---
import { 
    home11 as missionImage, 
    home5 as qualityImage, 
    home14 as processImage
} from "../assets/images/assets"; 
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import AnimatedCounter from "../components/AnimatedCounter";

// Section wrapper for animations
const AnimatedSection = ({ children, className }) => {
    const [ref, isIntersecting] = useIntersectionObserver({ threshold: 0.1, triggerOnce: true });
    return (
        <section 
            ref={ref}
            className={`${className} transition-all duration-1000 ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
            {children}
        </section>
    );
};

// "Our Process" Step Component
const ProcessStep = ({ number, title, description }) => (
    <div className="relative pl-12">
        <div className="absolute left-0 top-0 w-10 h-10 flex items-center justify-center bg-light-green text-primary rounded-full font-bold text-lg">
            {number}
        </div>
        <h3 className="text-xl font-bold text-text-header mb-2">{title}</h3>
        <p className="text-text-muted">{description}</p>
    </div>
);

export default function About() {
  return (
    <div className="bg-background">
      {/* 1. Header Section */}
      <section className="bg-primary text-white text-center py-20">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">A Legacy of Purity & Taste</h1>
          <p className="text-lg text-gray-200">Discover the story behind VinitaMart's commitment to authentic, homemade goodness.</p>
        </div>
      </section>

      <div className="py-16 md:py-24 space-y-16 md:space-y-24">
        
        {/* 2. Our Mission Section */}
        <AnimatedSection className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-primary font-semibold tracking-wider uppercase">Our Core Belief</span>
            <h2 className="text-3xl font-bold text-text-header mb-4 mt-2">Good Food, Good Life</h2>
            <p className="text-text-body leading-relaxed mb-4">
              Our mission is to bring the authentic taste of home to every kitchen. We believe in the power of natural ingredients and traditional recipes to not only create delicious meals but also to foster a healthier, happier lifestyle for your family.
            </p>
          </div>
          <div className="flex justify-center">
            <img src={missionImage} alt="Our mission" className="rounded-2xl shadow-lg w-full max-w-sm"/>
          </div>
        </AnimatedSection>

        {/* 3. Animated Counters Section */}
        <section className="max-w-5xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div><h3 className="text-4xl md:text-5xl font-bold text-primary"><AnimatedCounter target="50" />+</h3><p className="text-text-muted mt-2">Unique Products</p></div>
                <div><h3 className="text-4xl md:text-5xl font-bold text-primary"><AnimatedCounter target="500" />+</h3><p className="text-text-muted mt-2">Happy Customers</p></div>
                <div><h3 className="text-4xl md:text-5xl font-bold text-primary"><AnimatedCounter target="100" suffix="%" /></h3><p className="text-text-muted mt-2">Natural Ingredients</p></div>
                <div><h3 className="text-4xl md:text-5xl font-bold text-primary"><AnimatedCounter target="4" />+</h3><p className="text-text-muted mt-2">Years of Tradition</p></div>
            </div>
        </section>

        {/* 4. "Ingredient Spotlight" Section */}
        <section className="bg-surface py-16">
            <AnimatedSection className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="flex justify-center">
                    {/* --- FIX: Using an existing imported image 'qualityImage' --- */}
                    <img src={qualityImage} alt="Ingredient Spotlight" className="rounded-2xl shadow-lg w-full max-w-sm"/>
                </div>
                <div className="text-center md:text-left">
                    <span className="text-primary font-semibold tracking-wider uppercase">The Soul of Our Spices</span>
                    <h2 className="text-3xl font-bold text-text-header mb-4 mt-2">Directly From the Source</h2>
                    <p className="text-text-body leading-relaxed mb-6">
                        We source our world-renowned spices directly from the fields of India. Known for high quality and vibrant color, they form the foundation of our spice blends, providing not just flavor but also immense health benefits. This is our commitment to authenticity in every pinch.
                    </p>
                </div>
            </AnimatedSection>
        </section>

        {/* 5. Our Process Section */}
        <AnimatedSection className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-text-header">Our Craftsmanship</h2>
                <p className="text-base text-text-muted mt-2">From farm to your family, with care at every step.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="space-y-10">
                    <ProcessStep number="1" title="Ethical Sourcing" description="We partner with local farmers who share our values, ensuring every ingredient is fresh, natural, and sustainably grown." />
                    <ProcessStep number="2" title="Handcrafted Blends" description="Using traditional stone-grinding techniques, we prepare our masalas in small batches to preserve their natural oils and authentic aroma." />
                    <ProcessStep number="3" title="Hygienic Packing" description="Every product is packed in a clean, controlled environment, sealing in the freshness and purity until it reaches your kitchen." />
                </div>
                <div className="flex justify-center">
                    <img src={processImage} alt="Our Process" className="rounded-2xl shadow-lg w-full max-w-sm"/>
                </div>
            </div>
        </AnimatedSection>
        
        {/* 6. "Behind the Scenes" Video Section */}
        <AnimatedSection className="max-w-5xl mx-auto px-4 text-center">
             <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-text-header">Behind the Scenes</h2>
                <p className="text-base text-text-muted mt-2">See the passion and care that goes into every pack.</p>
            </div>
            <div className="relative aspect-video w-full rounded-2xl shadow-2xl overflow-hidden">
                <iframe 
                    className="absolute top-0 left-0 w-full h-full"
                    src="https://www.youtube.com/embed/lpYdqopKvxw?si=Q9wYjTmr6PPCv2Li"
                    title="Behind the Scenes at VinitaMart" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen>
                </iframe>
            </div>
        </AnimatedSection>
        
        {/* 7. Our Journey (Timeline) */}
        <AnimatedSection className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-12"><h2 className="text-3xl md:text-4xl font-bold text-text-header">Our Journey</h2></div>
            <div className="relative">
                <div className="absolute left-1/2 w-0.5 h-full bg-border -translate-x-1/2"></div>
                <div className="relative mb-8 flex justify-between items-center w-full"><div className="w-1/2 pr-8 text-right"><p className="font-bold text-primary">2020</p><h3 className="text-xl font-semibold text-text-header">The Idea Was Born</h3></div><div className="absolute left-1/2 w-4 h-4 bg-primary rounded-full -translate-x-1/2"></div></div>
                <div className="relative mb-8 flex justify-between items-center w-full"><div className="w-1/2"></div><div className="w-1/2 pl-8 text-left"><p className="font-bold text-primary">2022</p><h3 className="text-xl font-semibold text-text-header">First 100 Customers</h3></div><div className="absolute left-1/2 w-4 h-4 bg-primary rounded-full -translate-x-1/2"></div></div>
                <div className="relative flex justify-between items-center w-full"><div className="w-1/2 pr-8 text-right"><p className="font-bold text-primary">2024</p><h3 className="text-xl font-semibold text-text-header">Launching Online</h3></div><div className="absolute left-1/2 w-4 h-4 bg-primary rounded-full -translate-x-1/2"></div></div>
            </div>
        </AnimatedSection>

        {/* 8. Meet The Team Section */}
        <AnimatedSection className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-12"><h2 className="text-3xl md:text-4xl font-bold text-text-header">The Artisans of Taste</h2><p className="text-base text-text-muted mt-2">The family behind the flavor.</p></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                <TeamMemberCard name="Vinita" role="Founder & Master Chef" />
                <TeamMemberCard name="Raja" role="CEO & Tech Visionary" />
                <TeamMemberCard name="Suresh" role="Head of Operations" />
            </div>
        </AnimatedSection>
      </div>
    </div>
  );
}