import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { assets } from "../assets/images/assets";
import vinitamartLogo from "../assets/images/vinitamart_logo.png";
import { useAppContext } from "../context/AppContext";

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { searchQuery, setSearchQuery, cartCount } = useAppContext();

  const showSearch = location.pathname === "/" || location.pathname.startsWith("/products");

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  const navLinkClass = ({ isActive }) => {
    return `relative py-2 text-base font-semibold after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 ${
      isActive
        ? "text-primary after:w-full"
        : "text-text-header hover:text-primary after:w-0 hover:after:w-full"
    }`;
  };

  return (
    <header className="w-full bg-background/80 backdrop-blur-lg sticky top-0 z-50 border-b border-border">
      <div className="mx-auto px-6 md:px-16 lg:px-24 xl:px-32 py-3 grid grid-cols-3 items-center">
        {/* Left: Logo */}
        <div className="flex justify-start">
          <Link to="/" aria-label="vinitamart home">
            <img
              src={vinitamartLogo}
              alt="vinitamart logo"
              className="h-12 md:h-14 w-auto object-contain"
            />
          </Link>
        </div>

        {/* Center: Desktop Navigation */}
        <nav className="hidden lg:flex items-center justify-center gap-10">
          <NavLink to="/" className={navLinkClass}>Home</NavLink>
          <NavLink to="/products" className={navLinkClass}>Products</NavLink>
          <NavLink to="/about" className={navLinkClass}>About</NavLink>
          <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>
        </nav>

        {/* Right: Search, Cart, Menu */}
        <div className="flex items-center justify-end gap-3 md:gap-4">
          {/* Search Bar Container */}
          <div className="relative hidden md:block">
            <div className={`transition-all duration-300 ${showSearch ? 'w-48 lg:w-64 opacity-100' : 'w-0 opacity-0'}`}>
              <span className={`pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-text-muted transition-opacity ${showSearch ? 'opacity-100' : 'opacity-0'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
                </svg>
              </span>
              <input
                type="search"
                aria-label="Search products"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className={`w-full h-11 pl-11 pr-4 rounded-full border border-border bg-background-alt focus:outline-none focus:ring-2 focus:ring-primary text-sm shadow-sm transition-all ${showSearch ? 'visible' : 'invisible'}`}
              />
            </div>
          </div>

          {/* Cart Icon */}
          <Link
            to="/cart"
            className="relative p-2.5 rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors"
            aria-label={`Cart with ${cartCount?.() || 0} items`}
          >
            <img src={assets.cart_icon} alt="Cart" className="w-6 h-6 text-text-header" />
            {cartCount?.() > 0 && (
              <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[22px] h-[22px] px-1 rounded-full bg-primary text-white text-xs font-bold border-2 border-background">
                {cartCount()}
              </span>
            )}
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 rounded-lg"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <img src={assets.menu_icon} alt="Menu" className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu - No changes needed here */}
      <div className={`fixed inset-0 z-50 transform transition-transform duration-300 ${isMenuOpen ? "translate-x-0" : "translate-x-full"} lg:hidden`}>
        <div className="absolute inset-0 bg-black/40" onClick={() => setMenuOpen(false)}></div>
        <div className="relative w-72 h-full bg-background ml-auto flex flex-col p-6">
          <button onClick={() => setMenuOpen(false)} className="self-end mb-8 p-2" aria-label="Close menu">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <nav className="flex flex-col gap-8 text-xl font-semibold">
            <NavLink to="/" onClick={() => setMenuOpen(false)} className={navLinkClass}>Home</NavLink>
            <NavLink to="/products" onClick={() => setMenuOpen(false)} className={navLinkClass}>Products</NavLink>
            <NavLink to="/about" onClick={() => setMenuOpen(false)} className={navLinkClass}>About</NavLink>
            <NavLink to="/contact" onClick={() => setMenuOpen(false)} className={navLinkClass}>Contact</NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;