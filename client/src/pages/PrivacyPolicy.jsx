import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="py-16 md:py-24 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-text-header">Privacy Policy</h1>
        <p className="text-text-muted mt-2">Last updated: November 10, 2025</p>
      </div>

      <div className="space-y-6 text-text-body leading-relaxed">
        <section>
          <h2 className="text-2xl font-bold text-text-header mb-3">1. Introduction</h2>
          <p>Welcome to VinitaMart. We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-text-header mb-3">2. Information We Collect</h2>
          <p>We may collect personal information such as your name, shipping address, email address, and phone number when you place an order or create an account on our site. We also collect non-personal data, such as browser type and pages visited, to improve our services.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-text-header mb-3">3. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul className="list-disc list-inside ml-4 space-y-1 mt-2">
            <li>Process and manage your orders.</li>
            <li>Communicate with you about your account or orders.</li>
            <li>Improve our website and customer service.</li>
            <li>Send you promotional materials, if you opt-in.</li>
          </ul>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold text-text-header mb-3">4. Security of Your Information</h2>
          <p>We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-text-header mb-3">5. Contact Us</h2>
          <p>If you have questions or comments about this Privacy Policy, please contact us at <a href="mailto:raja@vnitagroup.com" className="text-primary hover:underline">raja@vnitagroup.com</a>.</p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;