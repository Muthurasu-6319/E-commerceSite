import React from "react";
import { useAppContext } from "../context/AppContext";
import { useAddress } from "../context/AddressContext"; // Import address context
import { formatVND } from "../utils/currency";
import toast from "react-hot-toast";
import { getImageUrl } from "../utils/config";
import { Link } from "react-router-dom";

const Cart = () => {
  const { products, navigate, cartItems, setCartItems, removeFromCart, addToCart, axios, user } = useAppContext();
  const { address } = useAddress(); // Get address from context

  const cartProducts = React.useMemo(() => {
    return Object.keys(cartItems).map(key => {
      const product = products.find(p => p._id === key);
      if (product) return { ...product, quantity: cartItems[key] };
      return null;
    }).filter(Boolean);
  }, [products, cartItems]);

  const subtotal = React.useMemo(() => {
    return cartProducts.reduce((total, item) => total + item.offerPrice * item.quantity, 0);
  }, [cartProducts]);

  const SHIPPING_FEE = 30000;
  const FREE_SHIPPING_THRESHOLD = 500000;
  const shippingCost = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const totalAmount = subtotal + shippingCost;

  const placeOrder = async () => {
    if (!user) {
      toast.error("Please login to place an order.");
      navigate("/login");
      return;
    }
    // --- NEW: Address validation ---
    if (!address || !address._id) {
      toast.error("Please add a delivery address first.");
      navigate("/add-address");
      return;
    }

    try {
      const orderPayload = {
        items: cartProducts.map(item => ({ product: item._id, quantity: item.quantity })),
        address: address._id,
      };
      
      const { data } = await axios.post("/api/order/cod", orderPayload);
      if (data.success) {
        toast.success(data.message);
        setCartItems({});
        navigate("/my-orders");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to place order.");
    }
  };
  
  if (cartProducts.length === 0) {
    return (
      <div className="text-center py-24"><h1 className="text-3xl font-bold text-text-header mb-4">Your Cart is Empty</h1><p className="text-text-muted mb-8">Looks like you haven't added anything yet.</p><button onClick={() => navigate("/products")} className="px-8 py-3 font-bold text-white bg-primary rounded-full shadow-lg hover:bg-primary-dark">Continue Shopping</button></div>
    );
  }

  return (
    <div className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12"><h1 className="text-4xl md:text-5xl font-extrabold text-text-header">Shopping Cart</h1></div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-2 bg-surface p-6 rounded-xl shadow-md border border-border">
            <div className="space-y-6">
              {cartProducts.map(product => (
                <div key={product._id} className="flex items-center gap-4 border-b border-border pb-6 last:border-b-0 last:pb-0">
                  <img src={getImageUrl(product.image[0])} alt={product.name} className="w-24 h-24 object-cover rounded-lg"/>
                  <div className="flex-grow">
                    <Link to={`/product/${product.category.toLowerCase()}/${product._id}`} className="font-bold text-text-header hover:text-primary">{product.name}</Link>
                    <p className="text-sm text-text-muted">{product.category}</p>
                    <p className="text-primary font-semibold mt-1">{formatVND(product.offerPrice)}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center gap-2 border border-border rounded-full h-10 px-2">
                      <button onClick={() => removeFromCart(product._id)} className="w-7 h-7 flex items-center justify-center text-lg font-bold rounded-full hover:bg-gray-100" aria-label="Decrease quantity">−</button>
                      <span className="text-sm font-bold w-5 text-center">{product.quantity}</span>
                      <button onClick={() => addToCart(product._id)} className="w-7 h-7 flex items-center justify-center text-lg font-bold rounded-full hover:bg-gray-100" aria-label="Increase quantity">+</button>
                    </div>
                    <p className="font-bold text-lg">{formatVND(product.offerPrice * product.quantity)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="bg-surface p-6 rounded-xl shadow-md border border-border sticky top-24">
              <h2 className="text-2xl font-bold text-text-header mb-4">Order Summary</h2>
              
              {/* --- NEW: Delivery Address Section --- */}
              <div className="mb-4">
                <h3 className="font-semibold text-text-header mb-2">Delivery To:</h3>
                {address && address._id ? (
                  <div className="text-sm text-text-muted p-4 bg-light-green rounded-lg">
                    <p className="font-bold">{address.firstname} {address.lastname}</p>
                    <p>{address.street}, {address.city}</p>
                    <p>{address.state}, {address.country} - {address.zipcode}</p>
                    <button onClick={() => navigate('/add-address')} className="text-primary font-semibold mt-2 hover:underline">Change Address</button>
                  </div>
                ) : (
                  <button onClick={() => navigate('/add-address')} className="w-full py-2 border-2 border-dashed border-primary text-primary font-semibold rounded-lg hover:bg-light-green">
                    + Add Delivery Address
                  </button>
                )}
              </div>

              <div className="space-y-3 text-text-body">
                <div className="flex justify-between"><p>Subtotal</p><p className="font-semibold">{formatVND(subtotal)}</p></div>
                <div className="flex justify-between"><p>Shipping Fee</p><p className="font-semibold">{shippingCost === 0 ? <span className="text-primary">FREE</span> : formatVND(shippingCost)}</p></div>
                {shippingCost > 0 && <p className="text-xs text-text-muted text-right">Add {formatVND(FREE_SHIPPING_THRESHOLD - subtotal)} more for free shipping</p>}
                <div className="border-t border-border pt-4 mt-4">
                  <div className="flex justify-between font-bold text-lg text-text-header"><p>Total</p><p>{formatVND(totalAmount)}</p></div>
                </div>
              </div>
              
              <button onClick={placeOrder} className="w-full mt-6 py-3 bg-accent text-white font-bold rounded-full hover:bg-accent-dark transition-colors">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;