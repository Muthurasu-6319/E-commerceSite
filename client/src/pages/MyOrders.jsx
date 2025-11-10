import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { formatVND } from "../utils/currency";
import { getImageUrl } from "../utils/config";
import { Link } from "react-router-dom";

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const { axios, user } = useContext(AppContext);

  useEffect(() => {
    // Only fetch orders if the user object is available
    if (user) {
      const fetchOrders = async () => {
        setLoading(true);
        try {
          const { data } = await axios.get("/api/order/user");
          if (data.success) {
            setMyOrders(data.orders);
          } else {
            toast.error(data.message);
          }
        } catch (error) {
          toast.error(error.response?.data?.message || "Could not fetch orders.");
        } finally {
          setLoading(false);
        }
      };
      fetchOrders();
    } else {
      // If user is null (still loading or not logged in), stop loading
      setLoading(false);
    }
  }, [user, axios]);

  // Loading State
  if (loading) {
    return (
      <div className="flex justify-center items-center py-24">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Not Logged In State
  if (!user) {
    return (
      <div className="text-center py-24">
        <h1 className="text-3xl font-bold text-text-header mb-4">Please Login</h1>
        <p className="text-text-muted mb-8">You need to be logged in to view your orders.</p>
        <Link to="/login" className="px-8 py-3 font-bold text-white bg-primary rounded-full shadow-lg hover:bg-primary-dark">
          Go to Login
        </Link>
      </div>
    )
  }

  // No Orders State
  if (myOrders.length === 0) {
    return (
      <div className="text-center py-24">
        <h1 className="text-3xl font-bold text-text-header mb-4">No Orders Found</h1>
        <p className="text-text-muted mb-8">You haven't placed any orders yet. Let's get shopping!</p>
        <Link to="/products" className="px-8 py-3 font-bold text-white bg-primary rounded-full shadow-lg hover:bg-primary-dark">
          Shop Now
        </Link>
      </div>
    )
  }

  // Orders Found State
  return (
    <div className="py-16 md:py-24 max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-text-header">My Orders</h1>
      </div>

      <div className="space-y-8">
        {myOrders.map((order) => (
          <div key={order._id} className="bg-surface border border-border rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 bg-light-green flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div>
                <p className="font-bold text-text-header">Order ID: <span className="font-normal text-text-muted">#{order._id.slice(-8)}</span></p>
                <p className="text-sm text-text-muted">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="text-left sm:text-right">
                <p className="font-bold text-text-header">{formatVND(order.amount)}</p>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {order.status}
                </span>
              </div>
            </div>
            
            <div className="p-4 space-y-4">
              {order.items.map((item, index) => (
                <div key={index} className="flex gap-4">
                  <img
                    src={getImageUrl(item.product.image[0])}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-grow">
                    <p className="font-semibold text-text-header">{item.product.name}</p>
                    <p className="text-sm text-text-muted">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-semibold">{formatVND(item.product.offerPrice * item.quantity)}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default MyOrders;