import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { formatVND } from '../../utils/currency';
import { Link } from 'react-router-dom';

// --- Lucide Icons (clean and modern) ---
import { DollarSign, ShoppingBag, Clock, Package } from 'lucide-react';

// --- Reusable Stat Card ---
const StatCard = ({ title, value, icon: Icon, color = "text-primary" }) => (
  <div className="bg-surface p-6 rounded-xl border border-border shadow-sm flex items-start justify-between">
    <div>
      <p className="text-sm text-text-muted">{title}</p>
      <p className="text-2xl font-bold text-text-header mt-1">{value}</p>
    </div>
    <div className={`p-3 rounded-full bg-light-green/40 ${color}`}>
      <Icon className="w-6 h-6" strokeWidth={2.2} />
    </div>
  </div>
);

const Dashboard = () => {
  const { axios, products } = useAppContext();
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    recentOrders: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const { data } = await axios.get("/api/order/seller?limit=5&sort=newest");
        const { data: allOrdersData } = await axios.get("/api/order/seller?limit=9999");
        if (data.success && allOrdersData.success) {
          const orders = allOrdersData.orders;
          const totalRevenue = orders.reduce(
            (sum, order) => (order.isPaid ? sum + order.amount : sum),
            0
          );
          const pendingOrders = orders.filter(o => o.status === 'Pending').length;

          setStats({
            totalOrders: orders.length,
            totalRevenue,
            pendingOrders,
            recentOrders: data.orders
          });
        }
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, [axios]);

  const productsInStock = products.filter(p => p.inStock).length;

  if (loading) return <div className="text-center p-10">Loading Dashboard...</div>;

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-text-header">Dashboard</h1>

      {/* --- Stat Cards --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value={formatVND(stats.totalRevenue)}
          icon={DollarSign}
          color="text-green-600"
        />
        <StatCard
          title="Total Orders"
          value={stats.totalOrders}
          icon={ShoppingBag}
          color="text-blue-600"
        />
        <StatCard
          title="Pending Orders"
          value={stats.pendingOrders}
          icon={Clock}
          color="text-yellow-600"
        />
        <StatCard
          title="Products In Stock"
          value={productsInStock}
          icon={Package}
          color="text-purple-600"
        />
      </div>

      {/* --- Recent Orders & Stock Overview --- */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* --- Recent Orders --- */}
        <div className="xl:col-span-2 bg-surface p-6 rounded-xl border border-border shadow-sm">
          <h3 className="font-bold text-lg mb-4">Recent Orders</h3>
          <div className="space-y-4">
            {stats.recentOrders.length > 0 ? (
              stats.recentOrders.map(order => (
                <div
                  key={order._id}
                  className="flex justify-between items-center text-sm border-b pb-2 last:border-0 last:pb-0"
                >
                  <div>
                    <p className="font-semibold">
                      #{order._id.slice(-6)} by {order.address.firstName}
                    </p>
                  </div>
                  <p>{formatVND(order.amount)}</p>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      order.status === 'Delivered'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-text-muted">No recent orders found.</p>
            )}

            {stats.totalOrders > 5 && (
              <Link
                to="/seller/orders"
                className="text-primary font-semibold text-sm hover:underline mt-4 inline-block"
              >
                View All Orders →
              </Link>
            )}
          </div>
        </div>

        {/* --- Stock Overview --- */}
        <div className="bg-surface p-6 rounded-xl border border-border shadow-sm">
          <h3 className="font-bold text-lg mb-4">Stock Overview</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Total Products:</span>
              <span className="font-bold">{products.length}</span>
            </div>
            <div className="flex justify-between text-green-600">
              <span>In Stock:</span>
              <span className="font-bold">{productsInStock}</span>
            </div>
            <div className="flex justify-between text-red-600">
              <span>Out of Stock:</span>
              <span className="font-bold">{products.length - productsInStock}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
