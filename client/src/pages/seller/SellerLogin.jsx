import toast from "react-hot-toast";
import { useAppContext } from "../../context/AppContext";
import React, { useState, useEffect } from "react";
import vinitamartLogo from '../../assets/images/vinitamart_logo.png'; // Import the logo

const SellerLogin = () => {
  const { isSeller, setIsSeller, setSellerToken, navigate, axios } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isSeller) {
      navigate("/seller");
    }
  }, [isSeller, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/seller/login", { email, password });
      if (data.success) {
        if (data.token) {
          setSellerToken(data.token);
        }
        setIsSeller(true);
        navigate("/seller");
        toast.success("Login successful!");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed.");
    }
  };

  return (
    // --- NEW CUSTOM LAYOUT mimicking the seller dashboard style ---
    <div className="flex h-screen w-full items-center justify-center bg-background p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
            <img 
              src={vinitamartLogo} 
              alt="VinitaMart" 
              className="h-12 w-auto mx-auto"
            />
            <h1 className="text-2xl font-bold text-text-header mt-4">Seller Panel</h1>
        </div>

        <div className="bg-surface p-8 rounded-xl border border-border shadow-md">
            <h2 className="text-xl font-bold text-center text-text-header mb-1">
                Welcome Back
            </h2>
            <p className="text-center text-text-muted mb-6">
                Please login to continue.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                <label className="block text-sm font-medium text-text-body mb-1">Email</label>
                <input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    placeholder="seller@example.com"
                    className="w-full px-3 py-2 border border-border rounded-md outline-none focus:ring-2 focus:ring-primary"
                    type="email"
                    required
                />
                </div>
                <div>
                <label className="block text-sm font-medium text-text-body mb-1">Password</label>
                <input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    placeholder="••••••••"
                    className="w-full px-3 py-2 border border-border rounded-md outline-none focus:ring-2 focus:ring-primary"
                    type="password"
                    required
                />
                </div>
                
                <button className="w-full bg-primary text-white font-semibold py-2.5 rounded-md hover:bg-primary-dark transition-colors">
                Login
                </button>
            </form>
        </div>
      </div>
    </div>
  );
};

export default SellerLogin;