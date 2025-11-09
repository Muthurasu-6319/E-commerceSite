import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import vinitamartLogo from "../assets/images/vinitamart_logo.png";
import { useAppContext } from "../context/AppContext";

// Icon components for clarity
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
    <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
  </svg>
);

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  </svg>
);

const CartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c.51 0 .962-.344 1.087-.835l1.838-5.513a1.875 1.875 0 00-1.087-2.336H6.118" />
  </svg>
);


const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  // --- UPDATED: Added 'navigate' ---
  const { searchQuery, setSearchQuery, cartCount, user, navigate } = useAppContext();

  const navLinkClass = ({ isActive }) => {
    return `relative py-2 text-base font-semibold transition-colors duration-300 ${
      isActive
        ? "text-accent"
        : "text-white hover:text-accent"
    }`;
  };
  
  // --- UPDATED: The click handler logic ---
  const handleAccountClick = () => {
    if (user) {
      navigate('/my-orders'); // If user is logged in, navigate to their orders page
    } else {
      navigate('/login');   // If user is not logged in, navigate to the login page
    }
  }

  return (
    <header className="w-full bg-primary text-white sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-primary-dark/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-10 flex justify-between items-center text-xs sm:text-sm font-medium">
          <span>🔔 Free shipping national for orders of ₫10,000 or more</span>
          <span className="hidden sm:block">📞 Hotline: 037 559 1393</span>
        </div>
      </div>
      
      <div className="w-full border-b border-white/20">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex items-center justify-between h-20">
            {/* Left: Logo */}
            <div className="flex-shrink-0">
              <Link to="/" aria-label="vinitamart home">
                <img
                  src={vinitamartLogo}
                  alt="vinitamart logo"
                  className="h-12 md:h-14 w-auto object-contain"
                />
              </Link>
            </div>
            
            {/* Center: Search Bar */}
            <div className="hidden lg:block w-full max-w-xl mx-8">
              <div className="relative">
                <input
                  type="search"
                  aria-label="Search products"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Find products..."
                  className="w-full h-11 pl-5 pr-14 text-text-body rounded-md border-none bg-surface focus:outline-none focus:ring-2 focus:ring-accent text-sm"
                />
                <button
                  type="button"
                  aria-label="Submit search"
                  className="absolute right-0 top-0 h-11 w-12 flex items-center justify-center bg-accent text-white rounded-r-md hover:bg-accent-dark"
                >
                  <SearchIcon />
                </button>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center justify-end gap-2 sm:gap-4">
              <button
                onClick={handleAccountClick} // This now has the correct logic
                className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-white/10 transition-colors"
                aria-label="Account"
              >
                <UserIcon />
                <span className="hidden md:block text-xs font-medium">{user ? user.name.split(' ')[0] : 'Account'}</span>
              </button>

              <Link
                to="/cart"
                className="relative flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-white/10 transition-colors"
                aria-label={`Cart with ${cartCount?.() || 0} items`}
              >
                <CartIcon />
                 <span className="hidden md:block text-xs font-medium">Cart</span>
                {cartCount?.() > 0 && (
                  <span className="absolute top-0 right-0 flex items-center justify-center min-w-[20px] h-[20px] px-1 rounded-full bg-accent text-white text-xs font-bold">
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
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom bar with navigation links */}
      <nav className="hidden lg:flex items-center justify-center gap-10 h-14">
          <NavLink to="/" className={navLinkClass} end>Home</NavLink>
          <NavLink to="/products" className={navLinkClass}>Shop</NavLink>
          <NavLink to="/about" className={navLinkClass}>About Us</NavLink>
          <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-50 transform transition-transform duration-300 ${isMenuOpen ? "translate-x-0" : "translate-x-full"} lg:hidden`}>
        <div className="absolute inset-0 bg-black/40" onClick={() => setMenuOpen(false)}></div>
        <div className="relative w-72 h-full bg-surface ml-auto flex flex-col p-6 text-text-body">
          <button onClick={() => setMenuOpen(false)} className="self-end mb-8 p-2" aria-label="Close menu">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          <div className="relative mb-8">
            <input type="search" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Find products..." className="w-full h-11 pl-4 pr-12 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary text-sm"/>
            <button type="button" className="absolute right-0 top-0 h-11 w-11 flex items-center justify-center bg-accent text-white rounded-r-md"><SearchIcon /></button>
          </div>
          <nav className="flex flex-col gap-8 text-xl font-semibold">
            <NavLink to="/" onClick={() => setMenuOpen(false)} className={navLinkClass}>Home</NavLink>
            <NavLink to="/products" onClick={() => setMenuOpen(false)} className={navLinkClass}>Shop</NavLink>
            <NavLink to="/about" onClick={() => setMenuOpen(false)} className={navLinkClass}>About Us</NavLink>
            <NavLink to="/contact" onClick={() => setMenuOpen(false)} className={navLinkClass}>Contact</NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;