import { Routes, Route, useLocation } from "react-router-dom";
import SEO from "./components/SEO";
import Products from "./pages/Products";
import SingleProduct from "./pages/SingleProduct";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";
import { useAppContext } from "./context/AppContext";
// --- FIX: Corrected the import path for Auth.jsx ---
import Auth from "./modals/Auth"; 
import ProductCategory from "./pages/ProductCategory";
import Address from "./pages/Address";
import MyOrders from "./pages/MyOrders";
import SellerLogin from "./components/seller/SellerLogin";
import SellerLayout from "./pages/seller/SellerLayout";
import DebugOrders from "./components/DebugOrders";
import AddProduct from "./pages/seller/AddProduct";
import ProductList from "./pages/seller/ProductList";
import Orders from "./pages/seller/Orders";
import Loading from "./components/Loading";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Hero from "./components/Hero";

const App = () => {
  const { loading, isSeller } = useAppContext();
  const location = useLocation();
  const isSellerRoute = location.pathname.startsWith("/seller");
  const isHomePage = location.pathname === "/";
  const isAuthPage = location.pathname === "/login";

  const defaultSEO = {
    title: 'VinitaMart',
    description: 'Discover amazing products at great prices on VinitaMart. Shop now for the best deals!',
  };

  return (
    <>
      <SEO {...defaultSEO} />
      <div className="min-h-screen flex flex-col">
        {loading && <Loading />}
        
        {!isSellerRoute && !isAuthPage && <Navbar />}
        
        <Toaster />

        {isHomePage && !isSellerRoute && <Hero />}
        
        <main
          className={
            !isSellerRoute && !isAuthPage
              ? `px-6 md:px-16 lg:px-24 xl:px-32 ${!isHomePage && 'pt-8'}`
              : ''
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
            <Route path="/my-orders" element={<MyOrders />} />
            <Route path="/loader" element={<Loading />} />
            <Route path="/debug-orders" element={<DebugOrders />} />

            <Route
              path="/seller"
              element={isSeller ? <SellerLayout /> : <SellerLogin />}
            >
              <Route index element={isSeller ? <AddProduct /> : null} />
              <Route path="product-list" element={isSeller ? <ProductList /> : null} />
              <Route path="orders" element={isSeller ? <Orders /> : null} />
            </Route>
          </Routes>
        </main>
        
        {!isSellerRoute && !isAuthPage && <Footer />}
      </div>
    </>
  );
};

export default App;