import { Link } from "react-router-dom";
import vinitamartLogo from "../assets/images/vinitamart_logo.png";

const Footer = () => {
  return (
    <footer className="bg-background-alt text-text-muted pt-16 pb-6 px-6 md:px-16 lg:px-24 xl:px-32 border-t border-border">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div className="max-w-sm">
          <img src={vinitamartLogo} alt="vinitamart" className="h-14 mb-4" />
          <p className="text-sm leading-relaxed">
            Authentic taste and natural goodness, delivered from our kitchen to yours. Experience the purity in every spoonful.
          </p>
          <div className="flex items-center gap-4 mt-6">
            <SocialIcon href="#" />
            <SocialIcon href="#" />
            <SocialIcon href="#" />
          </div>
        </div>

        <div>
          <h3 className="text-base font-semibold text-text-header mb-4 tracking-wider uppercase">Quick Links</h3>
          <ul className="space-y-3 text-sm">
            <li><FooterLink to="/about">About Us</FooterLink></li>
            <li><FooterLink to="/products">All Products</FooterLink></li>
            <li><FooterLink to="/contact">Contact</FooterLink></li>
            <li><FooterLink to="#">FAQs</FooterLink></li>
          </ul>
        </div>

        <div>
          <h3 className="text-base font-semibold text-text-header mb-4 tracking-wider uppercase">Contact Info</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-3"><span>📍</span><span>No. 15B, Bat Khoi Street, Hanoi, Vietnam</span></li>
            <li className="flex items-start gap-3"><span>📧</span><FooterLink to="mailto:raja@vnitagroup.com">raja@vnitagroup.com</FooterLink></li>
            <li className="flex items-start gap-3"><span>📞</span><FooterLink to="tel:+84975473459">+84 975 473 459</FooterLink></li>
          </ul>
        </div>

        <div>
          <h3 className="text-base font-semibold text-text-header mb-4 tracking-wider uppercase">Stay Updated</h3>
          <p className="text-sm mb-4">
            Subscribe for special offers and flavorful updates.
          </p>
          <form className="flex items-center">
            <input
              type="email"
              className="bg-white rounded-l-md border border-border h-11 px-4 w-full outline-none focus:ring-2 focus:ring-primary"
              placeholder="Your email"
              aria-label="Email for newsletter"
            />
            <button
              type="submit"
              className="flex items-center justify-center bg-primary h-11 px-4 rounded-r-md text-white hover:bg-primary-dark transition-colors"
              aria-label="Subscribe"
            >
              <span>›</span>
            </button>
          </form>
        </div>
      </div>
      
      <div className="mt-12 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between text-xs">
        <p>© {new Date().getFullYear()} vinitamart · All Rights Reserved.</p>
        <ul className="flex items-center gap-6 mt-4 md:mt-0">
          <li><FooterLink to="#">Privacy Policy</FooterLink></li>
          <li><FooterLink to="#">Terms of Service</FooterLink></li>
        </ul>
      </div>
    </footer>
  );
};

const FooterLink = ({ to, children }) => (
  <Link to={to} className="hover:text-primary transition-colors duration-300">{children}</Link>
);

const SocialIcon = ({ href }) => (
  <a href={href} className="w-9 h-9 flex items-center justify-center rounded-full bg-border text-text-muted hover:bg-primary hover:text-white transition-all">
    <div className="w-5 h-5"></div>
  </a>
);

export default Footer;