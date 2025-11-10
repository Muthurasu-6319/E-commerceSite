import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { formatVND } from "../../utils/currency";
import { getImageUrl } from "../../utils/config";

const Orders = () => {
  const { axios } = useContext(AppContext);
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const fetchOrders = async (pageNum = 1) => {
    try {
      const { data } = await axios.get("/api/order/seller", { params: { page: pageNum, limit: 10 } });
      if (data.success) {
        setOrders(data.orders); setPages(data.pages); setPage(data.page);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch orders");
    }
  };
  
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const { data } = await axios.put(`/api/order/${orderId}/status`, { status: newStatus });
      if (data.success) {
        toast.success("Order status updated");
        fetchOrders(page);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // --- RE-ADDED: Function to delete an order ---
  const deleteOrder = async (orderId) => {
    if (!window.confirm("Permanently delete this order? This cannot be undone.")) return;
    try {
      const { data } = await axios.delete(`/api/order/${orderId}`);
      if (data.success) {
        toast.success("Order deleted successfully.");
        fetchOrders(page); // Refresh the list
      } else {
        toast.error(data.message);
      }
    } catch (error) {
       toast.error(error.response?.data?.message || "Failed to delete order.");
    }
  };

  useEffect(() => { fetchOrders(page) }, [page]);

  return (
    <div className="bg-surface p-6 rounded-xl border border-border shadow-sm">
      <h1 className="text-xl font-bold text-text-header mb-6">Customer Orders</h1>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-xs text-text-muted uppercase bg-light-green">
            <tr>
              <th className="px-6 py-3">Order ID</th><th className="px-6 py-3">Items</th><th className="px-6 py-3">Customer</th>
              <th className="px-6 py-3">Total</th><th className="px-6 py-3">Status</th><th className="px-6 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-primary">#{order._id.slice(-6)}</td>
                <td className="px-6 py-4">
                  {order.items.map(item => (<div key={item._id} className="flex items-center gap-2 mb-2 last:mb-0">
                      <img src={getImageUrl(item.product.image[0])} alt="" className="w-8 h-8 rounded-md" />
                      <span>{item.product.name} x {item.quantity}</span></div>))}
                </td>
                <td className="px-6 py-4">{order.address.firstName}</td>
                <td className="px-6 py-4">{formatVND(order.amount)}</td>
                <td className="px-6 py-4">
                  <select value={order.status} onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                    className={`p-2 rounded-md text-xs outline-none border ${order.status === 'Delivered' ? 'bg-green-100 border-green-200 text-green-800' : 'bg-yellow-100 border-yellow-200 text-yellow-800'}`}>
                    <option value="Pending">Pending</option><option value="Processing">Processing</option><option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option><option value="Cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="px-6 py-4 text-center">
                  <button onClick={() => deleteOrder(order._id)} className="font-medium text-red-500 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {orders.length === 0 && <p className="text-center text-text-muted py-10">No orders found.</p>}
      <div className="flex justify-center items-center gap-2 mt-6">
        {Array.from({ length: pages }, (_, i) => i + 1).map((pNum) => (
          <button key={pNum} onClick={() => setPage(pNum)} className={`px-4 py-2 border rounded-md ${pNum === page ? 'bg-primary text-white' : 'hover:bg-light-green'}`}>{pNum}</button>
        ))}
      </div>
    </div>
  );
};

export default Orders;