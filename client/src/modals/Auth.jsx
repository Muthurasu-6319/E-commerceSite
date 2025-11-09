import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-hot-toast";
import AuthLayout from "../components/AuthLayout"; // Import the new layout

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser, axios, navigate } = useAppContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? "/api/user/login" : "/api/user/register";
    try {
      const { data } = await axios.post(endpoint, { name, email, password });
      if (data.success) {
        toast.success(data.message);
        setUser(data.user);
        navigate("/"); // Redirect to home after login/register
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <AuthLayout>
      <h2 className="text-2xl font-bold text-center text-text-header mb-1">
        {isLogin ? "Welcome Back!" : "Create an Account"}
      </h2>
      <p className="text-center text-text-muted mb-6">
        {isLogin ? "Login to continue" : "Get started with us today"}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <div>
            <label className="block text-sm font-medium text-text-body mb-1">Name</label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Your full name"
              className="w-full px-3 py-2 border border-border rounded-md outline-none focus:ring-2 focus:ring-primary"
              type="text"
              required
            />
          </div>
        )}
        <div>
          <label className="block text-sm font-medium text-text-body mb-1">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="you@example.com"
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
          {isLogin ? "Login" : "Create Account"}
        </button>

        <p className="text-center text-sm text-text-muted">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span
            onClick={() => setIsLogin(!isLogin)}
            className="font-semibold text-primary cursor-pointer hover:underline"
          >
            {isLogin ? "Sign up" : "Log in"}
          </span>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Auth;