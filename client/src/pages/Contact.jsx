import React, { useState } from "react";

// --- NEW: FAQ Accordion Item Component ---
const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-border">
      <button
        className="w-full flex justify-between items-center text-left py-4"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-semibold text-text-header">{question}</h3>
        <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
          <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
        <p className="pt-2 pb-4 text-text-body">{answer}</p>
      </div>
    </div>
  );
};

// Contact Info Item from a previous step, refined
const ContactInfoItem = ({ icon, title, value, href }) => (
  <div className="flex items-start gap-4">
    <div className="flex-shrink-0 w-14 h-14 flex items-center justify-center bg-light-green text-primary rounded-lg">
      {icon}
    </div>
    <div>
      <h3 className="font-bold text-text-header">{title}</h3>
      <a href={href} className="text-text-muted hover:text-primary transition-colors">{value}</a>
    </div>
  </div>
);

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle form submission to a backend
    console.log("Form submitted:", form);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000); // Hide message after 5 seconds
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="bg-background">
      {/* 1. Header Section */}
      <section className="bg-surface border-b border-border text-center py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-text-header mb-4">
            We'd Love to Hear From You
          </h1>
          <p className="text-lg text-text-muted">
            Whether you have a question, a suggestion, or just want to say hello - we're here for you.
          </p>
        </div>
      </section>

      <div className="py-16 md:py-24 space-y-16 md:space-y-24">

        {/* 2. Contact Info & Form Section */}
        <section className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: Contact Details */}
          <div className="space-y-8">
            <ContactInfoItem 
              icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m21.75 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m21.75 0l-5.625 5.625M3.75 6.75l5.625 5.625m0 0L12 15.25l2.625-2.875M12 15.25l2.625 2.875M9.375 12l-2.625 2.875" /></svg>}
              title="Email Us"
              value="raja@vnitagroup.com"
              href="mailto:raja@vnitagroup.com"
            />
            <ContactInfoItem 
              icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 6.75z" /></svg>}
              title="Call Us"
              value="+84 975 473 459"
              href="tel:+84975473459"
            />
            <ContactInfoItem 
              icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>}
              title="Find Us"
              value="No. 15B, Bat Khoi Street, Hanoi, Vietnam"
              href="#"
            />
          </div>
          {/* Right: Contact Form */}
          <form
            className="flex flex-col gap-6 bg-surface p-8 rounded-xl border border-border shadow-md"
            onSubmit={handleSubmit}
          >
            <h2 className="text-2xl font-bold text-text-header mb-2">Send us a Message</h2>
            <div>
              <label htmlFor="name" className="block text-sm font-bold text-text-header mb-2">Full Name</label>
              <input type="text" id="name" name="name" onChange={(e) => setForm({...form, name: e.target.value})} value={form.name} required className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white outline-none focus:ring-2 focus:ring-primary"/>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-text-header mb-2">Email Address</label>
              <input type="email" id="email" name="email" onChange={(e) => setForm({...form, email: e.target.value})} value={form.email} required className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white outline-none focus:ring-2 focus:ring-primary"/>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-bold text-text-header mb-2">Message</label>
              <textarea id="message" name="message" onChange={(e) => setForm({...form, message: e.target.value})} value={form.message} required rows={5} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white outline-none focus:ring-2 focus:ring-primary resize-none"/>
            </div>
            <button type="submit" className="w-full py-3 px-4 bg-primary text-white font-bold rounded-lg hover:bg-primary-dark transition-colors">
              Send Message
            </button>
            {submitted && <p className="text-green-600 text-sm font-medium text-center">Thank you! We'll get back to you soon.</p>}
          </form>
        </section>

        {/* 3. Google Map Section */}
        <section className="max-w-6xl mx-auto px-4">
            <div className="w-full h-96 rounded-2xl overflow-hidden shadow-lg border border-border">
                {/* Replace this iframe src with your actual Google Maps embed link */}
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.863111451025!2d105.8973688758832!3d20.998188188734213!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135af5f81283233%3A0x80525b68233a010a!2zMTUgQkMgTmcuIDQwOSDEkC4gQuF0IEto4buRaSwgQ-G7sSBMaW5oLCBMb25nIEJpw6puLCBIw6AgTuG7mWksIFZpZXRuYW0!5e0!3m2!1sen!2s!4v1672583815091!5m2!1sen!2s"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="VinitaMart Location"
                ></iframe>
            </div>
        </section>

        {/* 4. FAQ Section */}
        <section className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-text-header">Frequently Asked Questions</h2>
            </div>
            <div>
                <FaqItem
                    question="What are the shipping options?"
                    answer="We offer standard shipping across Vietnam. Orders above ₫500,000 are eligible for free shipping. We typically dispatch orders within 24-48 hours."
                />
                <FaqItem
                    question="Are your products really preservative-free?"
                    answer="Absolutely! All our products are 100% natural and handmade. We do not use any artificial colors, flavors, or preservatives. Purity is our promise."
                />
                <FaqItem
                    question="How can I track my order?"
                    answer="Once your order is shipped, you will receive an email with a tracking link and number. You can use this to track the status of your delivery."
                />
                <FaqItem
                    question="What is your return policy?"
                    answer="If you are not satisfied with your product, you can return it within 7 days of delivery for a full refund, provided the package is unopened. Please contact our support team to initiate a return."
                />
            </div>
        </section>
      </div>
    </div>
  );
}