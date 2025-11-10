import React from 'react';

const Terms = () => {
  return (
    <div className="py-16 md:py-24 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-text-header">Terms of Service</h1>
        <p className="text-text-muted mt-2">Last updated: November 10, 2025</p>
      </div>

      <div className="space-y-6 text-text-body leading-relaxed">
        <section>
          <h2 className="text-2xl font-bold text-text-header mb-3">1. Agreement to Terms</h2>
          <p>By using our website, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-text-header mb-3">2. Purchases and Payment</h2>
          <p>We accept Cash on Delivery (COD) as our primary payment method. By confirming a purchase, you agree to provide the full payment amount to the delivery agent upon receipt of your order.</p>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold text-text-header mb-3">3. User Conduct</h2>
          <p>You agree not to use the website for any unlawful purpose. You are prohibited from violating or attempting to violate the security of the site, including, without limitation, accessing data not intended for you or logging into a server or account which you are not authorized to access.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-text-header mb-3">4. Limitation of Liability</h2>
          <p>VinitaMart shall not be liable for any indirect, incidental, special, consequential or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, resulting from your access to or use of our services.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-text-header mb-3">5. Contact Us</h2>
          <p>If you have any questions about these Terms, please contact us at <a href="mailto:raja@vnitagroup.com" className="text-primary hover:underline">raja@vnitagroup.com</a>.</p>
        </section>
      </div>
    </div>
  );
};

export default Terms;