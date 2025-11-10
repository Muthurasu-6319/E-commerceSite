import { Routes, Route, useLocation } from "react-router-dom";
import SEO from "./components/SEO";
import Products from "./pages/Products";
import SingleProduct from "./pages/SingleProduct";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import PrivacyPolicy from "./pages/PrivacyPolicy"; // <-- ADD THIS
import Terms from "./pages/Terms"; // <-- ADD THIS
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";
import { useAppContext } from "./context/AppContext";
import Auth from "./modals/Auth";
import ProductCategory from "./pages/ProductCategory";
import Address from "./pages/Address";
import MyOrders from "./pages/MyOrders";
import SellerLayout from "./pages/seller/SellerLayout";
import DebugOrders from "./components/DebugOrders";
import Loading from "./components/Loading";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Hero from "./components/Hero";

// --- UPDATED IMPORTS FOR SELLER SECTION ---
import SellerLogin from "./pages/seller/SellerLogin";
import Dashboard from "./pages/seller/Dashboard";
import AddProduct from "./pages/seller/AddProduct";
import ProductList from "./pages/seller/ProductList";
import Orders from "./pages/seller/Orders";


const App = () => {
  const { loading, isSeller } = useAppContext();
  const location = useLocation();
  const isSellerRoute = location.pathname.startsWith("/seller");
  const isHomePage = location.pathname === "/";
  const isAuthPage = location.pathname === "/login";

  // Check if the current route is the seller login route. We do this by checking if the path is /seller AND the user is NOT a seller.
  const isSellerLoginPage = location.pathname === "/seller" && !isSeller;

  const defaultSEO = {
    title: 'VinitaMart',
    description: 'Discover amazing products at great prices on VinitaMart. Shop now for the best deals!',
  };

  return (
    <>
      <SEO {...defaultSEO} />
      <div className="min-h-screen flex flex-col">
        {loading && <Loading />}
        
        {/* Do not show Navbar/Footer on any seller route or login page */}
        {!isSellerRoute && !isAuthPage && <Navbar />}
        
        <Toaster />

        {isHomePage && !isSellerRoute && <Hero />}
        
        <main
          className={
            !isSellerRoute && !isAuthPage
              ? `px-6 md:px-16 lg:px-24 xl:px-32 ${!isHomePage && 'pt-8'}`
              // If it's the seller login page, don't add padding.
              : isSellerLoginPage ? '' : 'flex-1'
          }
        >
          <Routes>
            <Route path="/login" element={<Auth />} />
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:category" element={<ProductCategory />} />
            <Route path="/product/:category/:id" element={<SingleProduct />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/add-address" element={<Address />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
             {/* --- ADD THESE TWO NEW ROUTES --- */}
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<Terms />} />
            <Route path="/my-orders" element={<MyOrders />} />
            <Route path="/loader" element={<Loading />} />
            <Route path="/debug-orders" element={<DebugOrders />} />

            {/* --- THIS ROUTE LOGIC IS NOW CORRECT --- */}
            <Route
              path="/seller"
              element={isSeller ? <SellerLayout /> : <SellerLogin />}
            >
              {isSeller && (
                <>
                  <Route index element={<Dashboard />} />
                  <Route path="add-product" element={<AddProduct />} />
                  <Route path="product-list" element={<ProductList />} />
                  <Route path="orders" element={<Orders />} />
                </>
              )}
            </Route>
          </Routes>
        </main>
        
        {!isSellerRoute && !isAuthPage && <Footer />}
      </div>
    </>
  );
};

export default App;