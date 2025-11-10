import { Link, NavLink, Outlet } from "react-router-dom";
import { assets } from "../../assets/images/assets";
import vinitamartLogo from "../../assets/images/vinitamart_logo.png";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const SellerLayout = () => {
  const { setIsSeller, clearSellerToken, navigate, axios } = useAppContext();
  
  const sidebarLinks = [
    { name: "Dashboard", path: "/seller", icon: assets.dashboard_icon },
    { name: "Add Product", path: "/seller/add-product", icon: assets.add_icon },
    { name: "Product List", path: "/seller/product-list", icon: assets.product_list_icon },
    { name: "Orders", path: "/seller/orders", icon: assets.order_icon },
  ];

  const logout = async () => {
    try {
      await axios.get("/api/seller/logout");
    } catch (error) {
      console.error("Logout API failed, but logging out client-side anyway.", error);
    } finally {
      clearSellerToken();
      setIsSeller(false);
      toast.success("Logged out successfully");
      navigate("/");
    }
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 bg-surface border-r border-border flex-col hidden sm:flex">
        <div className="h-20 flex items-center px-6 border-b border-border">
          <img src={vinitamartLogo} alt="vinitamart" className="h-10 w-auto" />
          <span className="text-xl font-bold text-text-header ml-2">Seller</span>
        </div>
        <nav className="flex-grow p-4 space-y-2">
          {sidebarLinks.map((item) => (
            <NavLink
              to={item.path}
              key={item.name}
              end={item.path === "/seller"}
              className={({ isActive }) => `flex items-center py-2.5 px-4 gap-3 rounded-lg transition-colors
                ${isActive
                  ? "bg-light-green text-primary font-semibold"
                  : "hover:bg-gray-100 text-text-body"
                }`}
            >
              <img src={item.icon} alt="" className="w-5 h-5" />
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="h-20 bg-surface border-b border-border flex items-center justify-end px-6">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-text-body">Hi! Admin</span>
            <button
              onClick={logout}
              className="border border-border rounded-full text-sm px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        </header>
        
        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SellerLayout;