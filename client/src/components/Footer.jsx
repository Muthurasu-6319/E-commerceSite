import { Link } from "react-router-dom";
import vinitamartLogo from "../assets/images/vinitamart_logo.png";

// Reusable component for footer links for consistency
const FooterLink = ({ to, children }) => (
  <Link to={to} className="text-text-muted hover:text-primary transition-colors duration-300">{children}</Link>
);

// Reusable social icon component
const SocialIcon = ({ href, children }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className="w-10 h-10 flex items-center justify-center rounded-full bg-light-green text-primary hover:bg-primary hover:text-white transition-all duration-300"
  >
    {children}
  </a>
);

const Footer = () => {
  return (
    <footer className="bg-surface text-text-body border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top section with newsletter */}
        <div className="py-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center border-b border-border">
          <div>
            <h3 className="text-2xl font-bold text-text-header">Stay Updated on Our Offers</h3>
            <p className="mt-2 text-text-muted">Subscribe for special offers, new products, and flavorful updates.</p>
          </div>
          <form className="flex items-center w-full max-w-md">
            <input
              type="email"
              className="bg-background border border-border h-12 px-4 w-full rounded-l-md outline-none focus:ring-2 focus:ring-primary"
              placeholder="Your email address"
              aria-label="Email for newsletter"
            />
            <button
              type="submit"
              className="flex items-center justify-center bg-primary h-12 px-6 rounded-r-md text-white font-semibold hover:bg-primary-dark transition-colors"
              aria-label="Subscribe"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Main footer content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {/* About Section */}
          <div className="lg:col-span-2">
            <img src={vinitamartLogo} alt="vinitamart" className="h-14 mb-4" />
            <p className="text-sm leading-relaxed max-w-sm">
              Authentic taste and natural goodness, delivered from our kitchen to yours. Experience the purity in every spoonful.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <SocialIcon href="#">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.58-2.46.67.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98-3.56-.18-6.73-1.89-8.84-4.48-.37.63-.58 1.37-.58 2.15 0 1.49.76 2.81 1.91 3.58-.7-.02-1.36-.21-1.94-.53v.05c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.52 8.52 0 0 1-5.33 1.84c-.35 0-.69-.02-1.03-.06A12.02 12.02 0 0 0 8.5 20c7.79 0 12.05-6.46 12.05-12.05 0-.18 0-.37-.01-.55.83-.6 1.56-1.36 2.13-2.2z" /></svg>
              </SocialIcon>
              <SocialIcon href="#">
                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.2 6.5h-1.7c-.55 0-1 .45-1 1v1.3h2.5l-.3 2.5h-2.2v6.2h-2.5V13.3h-2v-2.5h2V9.4c0-1.4.9-2.9 2.9-2.9h2.3v2z" /></svg>
              </SocialIcon>
               <SocialIcon href="#">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z" /></svg>
              </SocialIcon>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base font-semibold text-text-header mb-4 tracking-wider uppercase">Company</h3>
            <ul className="space-y-3 text-sm">
              <li><FooterLink to="/about">About Us</FooterLink></li>
              <li><FooterLink to="/products">All Products</FooterLink></li>
              <li><FooterLink to="/contact">Contact Us</FooterLink></li>
            </ul>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-base font-semibold text-text-header mb-4 tracking-wider uppercase">Shop</h3>
            <ul className="space-y-3 text-sm">
              <li><FooterLink to="/products/spices">Spices</FooterLink></li>
              <li><FooterLink to="/products/health-mix">Health Mix</FooterLink></li>
              <li><FooterLink to="/products/malts">Malts</FooterLink></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-base font-semibold text-text-header mb-4 tracking-wider uppercase">Contact Info</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <span className="mt-1">📍</span>
                <span>No. 15B, Bat Khoi Street, Hanoi, Vietnam</span>
              </li>
              <li className="flex items-start gap-3">
                <span>📧</span>
                <FooterLink to="mailto:raja@vnitagroup.com">raja@vnitagroup.com</FooterLink>
              </li>
              <li className="flex items-start gap-3">
                <span>📞</span>
                <FooterLink to="tel:+84975473459">+84 975 473 459</FooterLink>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom bar */}
        <div className="mt-8 py-6 border-t border-border flex flex-col md:flex-row items-center justify-between text-xs text-text-muted">
          <p>© {new Date().getFullYear()} vinitamart · All Rights Reserved.</p>
          <ul className="flex items-center gap-6 mt-4 md:mt-0">
            <li><FooterLink to="#">Privacy Policy</FooterLink></li>
            <li><FooterLink to="#">Terms of Service</FooterLink></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;