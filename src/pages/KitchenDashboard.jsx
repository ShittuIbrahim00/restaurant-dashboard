import { useEffect, useState } from "react";
import axios from "axios";

const KitchenDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  const fetchOrders = async () => {
    try {
      const res = await axios.get("/api/kitchen", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching orders:", err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(); // initial fetch

    const interval = setInterval(fetchOrders, 10000); // every 10s

    return () => clearInterval(interval); // cleanup on unmount
  }, [token]);

  const updateStatus = async (orderId, itemId, status) => {
    try {
      await axios.put(
        `/api/kitchen/${orderId}`,
        { itemId, status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchOrders(); // refresh after status update
    } catch (err) {
      console.error("Error updating status:", err.response?.data?.message);
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Kitchen Orders</h1>
      {orders.length > 0 ? (
        <p>No active kitchen orders.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="bg-white shadow-md rounded-xl p-4 mb-6"
          >
            <h2 className="text-xl font-semibold mb-2">Order #{order._id}</h2>
            <div className="space-y-2">
              {order.items.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between items-center bg-gray-100 p-2 rounded-md"
                >
                  <span>{item.menuItem.name}</span>
                  <select
                    value={item.status}
                    onChange={(e) =>
                      updateStatus(order._id, item._id, e.target.value)
                    }
                    className="px-2 py-1 rounded-md border"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Preparing">Preparing</option>
                    <option value="Ready">Ready</option>
                  </select>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default KitchenDashboard;
