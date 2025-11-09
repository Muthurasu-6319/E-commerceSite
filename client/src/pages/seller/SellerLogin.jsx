import toast from "react-hot-toast";
import { useAppContext } from "../../context/AppContext";
import React, { useState, useEffect } from "react";
import AuthLayout from "../AuthLayout"; // Import the layout

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
    <AuthLayout>
      <h2 className="text-2xl font-bold text-center text-text-header mb-1">
        Seller Login
      </h2>
      <p className="text-center text-text-muted mb-6">
        Welcome back, partner!
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
    </AuthLayout>
  );
};

export default SellerLogin;