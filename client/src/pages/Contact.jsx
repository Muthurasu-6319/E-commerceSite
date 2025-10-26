import React, { useState } from "react";
import Scanner from "../assets/images/Scanner.jpeg";

const ContactInfoItem = ({ icon, title, value, href }) => (
  <div className="flex items-start gap-4">
    <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-accent/50 text-primary rounded-lg">
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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle form submission to a backend
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000); // Hide message after 5 seconds
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-text-header mb-4">
            Get In Touch
          </h1>
          <p className="text-lg text-text-body max-w-3xl mx-auto">
            Have questions about our products, your order, or just want to say hello? We’d love to hear from you.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Contact Form */}
          <form
            className="flex flex-col gap-6 bg-background-alt p-8 rounded-xl border border-border"
            onSubmit={handleSubmit}
          >
            <h2 className="text-2xl font-bold text-text-header mb-2">Send us a Message</h2>
            <div>
              <label htmlFor="name" className="block text-sm font-bold text-text-header mb-2">Full Name</label>
              <input type="text" id="name" name="name" value={form.name} onChange={handleChange} required className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white outline-none focus:ring-2 focus:ring-primary"/>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-text-header mb-2">Email Address</label>
              <input type="email" id="email" name="email" value={form.email} onChange={handleChange} required className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white outline-none focus:ring-2 focus:ring-primary"/>
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-bold text-text-header mb-2">Subject</label>
              <input type="text" id="subject" name="subject" value={form.subject} onChange={handleChange} required className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white outline-none focus:ring-2 focus:ring-primary"/>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-bold text-text-header mb-2">Message</label>
              <textarea id="message" name="message" value={form.message} onChange={handleChange} required rows={5} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white outline-none focus:ring-2 focus:ring-primary resize-none"/>
            </div>
            <button type="submit" className="w-full py-3 px-4 bg-primary text-white font-bold rounded-lg hover:bg-primary-dark transition-colors">
              Send Message
            </button>
            {submitted && (
              <p className="text-green-600 text-sm font-medium text-center">
                Thank you for your message! We’ll get back to you soon.
              </p>
            )}
          </form>
          
          {/* Contact Details */}
          <div className="space-y-8">
            <ContactInfoItem 
              icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m21.75 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m21.75 0l-5.625 5.625M3.75 6.75l5.625 5.625m0 0L12 15.25l2.625-2.875M12 15.25l2.625 2.875M9.375 12l-2.625 2.875" /></svg>}
              title="Email Us"
              value="raja@vnitagroup.com"
              href="mailto:raja@vnitagroup.com"
            />
            <ContactInfoItem 
              icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 6.75z" /></svg>}
              title="Call Us"
              value="+84 975 473 459"
              href="tel:+84975473459"
            />
            <ContactInfoItem 
              icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>}
              title="Find Us"
              value="No. 15B, Bat Khoi Street, Hanoi, Vietnam"
              href="#"
            />
          </div>
        </div>
      </div>
    </div>
  );
}