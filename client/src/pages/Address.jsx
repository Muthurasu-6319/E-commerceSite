import React, { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { useAddress } from "../context/AddressContext";
import AuthLayout from "../components/AuthLayout"; // Re-using our AuthLayout for a consistent look
import toast from "react-hot-toast";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Address = () => {
  const { address, updateAddress } = useAddress();
  const { axios, user } = useAppContext();
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Pre-fill email from user object if available
  useEffect(() => {
    if (user && user.email && !address.email) {
      updateAddress('email', user.email);
    }
  }, [user, address.email, updateAddress]);

  const handleChange = (e) => {
    updateAddress(e.target.name, e.target.value);
    if (errors[e.target.name]) {
      setErrors(prev => ({ ...prev, [e.target.name]: "" }));
    }
  };

  const validate = () => {
    const requiredFields = ["firstname", "lastname", "email", "street", "city", "state", "zipcode", "country", "phone"];
    let errs = {};
    requiredFields.forEach(field => {
      if (!address[field]) {
        errs[field] = "This field is required";
      }
    });

    if (address.email && !emailRegex.test(address.email)) {
      errs.email = "Invalid email format";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const { data } = await axios.post("/api/address/add", { address });
      if (data.success && data.address) {
        // Update context with the full address from backend, including _id
        Object.keys(data.address).forEach(key => updateAddress(key, data.address[key]));
        toast.success("Address saved successfully!");
        navigate("/cart"); // Go back to cart after saving
      } else {
        toast.error(data.message || "Failed to save address.");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to submit address");
    }
  };

  return (
    <AuthLayout>
      <h2 className="text-2xl font-bold text-center text-text-header mb-1">Delivery Address</h2>
      <p className="text-center text-text-muted mb-6">Where should we send your order?</p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField name="firstname" label="First Name" value={address.firstname} onChange={handleChange} error={errors.firstname} />
          <InputField name="lastname" label="Last Name" value={address.lastname} onChange={handleChange} error={errors.lastname} />
        </div>
        <InputField name="email" label="Email" type="email" value={address.email} onChange={handleChange} error={errors.email} />
        <InputField name="street" label="Street Address" value={address.street} onChange={handleChange} error={errors.street} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField name="city" label="City" value={address.city} onChange={handleChange} error={errors.city} />
          <InputField name="state" label="State / Province" value={address.state} onChange={handleChange} error={errors.state} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField name="zipcode" label="ZIP / Postal Code" value={address.zipcode} onChange={handleChange} error={errors.zipcode} />
          <InputField name="country" label="Country" value={address.country} onChange={handleChange} error={errors.country} />
        </div>
        <InputField name="phone" label="Phone Number" type="tel" value={address.phone} onChange={handleChange} error={errors.phone} />

        <button type="submit" className="w-full bg-primary text-white font-semibold py-2.5 rounded-md hover:bg-primary-dark transition-colors">
          Save and Continue
        </button>
      </form>
    </AuthLayout>
  );
};

// Reusable Input Field component for cleaner code
const InputField = ({ name, label, value, onChange, error, type = "text" }) => (
  <div>
    <label className="block text-sm font-medium text-text-body mb-1">{label}</label>
    <input name={name} value={value} onChange={onChange} type={type} className={`w-full px-3 py-2 border rounded-md outline-none focus:ring-2 ${error ? 'border-red-500 focus:ring-red-500' : 'border-border focus:ring-primary'}`} />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

export default Address;