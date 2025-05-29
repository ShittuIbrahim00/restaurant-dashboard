import { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import axios from "axios";
import toast from "react-hot-toast";
import { saveAs } from "file-saver";
import Papa from "papaparse";

// const SOCKET_URL = "http://localhost:5000";
const SOCKET_URL = "https://restaurant-backend-wwjm.onrender.com/api/v1";

export default function KitchenDashboard() {
  const [orders, setOrders] = useState([]);
  const [filterStatus, setFilterStatus] = useState("pending");
  const [orderTypeFilter, setOrderTypeFilter] = useState("all");
  const [lowStockItems, setLowStockItems] = useState([]);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [highlightedOrderIds, setHighlightedOrderIds] = useState([]);

  const socketRef = useRef(null);
  const alertSound = useRef(null);
  const intervalRef = useRef(null);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${SOCKET_URL}/orders/pending`);
      setOrders(res.data.orders);
    } catch {
      toast.error("Failed to fetch orders");
    }
  };

  const fetchLowStockItems = async () => {
    try {
      const res = await axios.get(`${SOCKET_URL}/inventory/low-stock`);
      setLowStockItems(res.data.lowStockItems);
    } catch {
      toast.error("Failed to fetch low stock items");
    }
  };

  useEffect(() => {
    fetchOrders();
    fetchLowStockItems();

    // Set up auto-refresh
    intervalRef.current = setInterval(() => {
      fetchOrders();
    }, 30000); // every 30 seconds

    return () => clearInterval(intervalRef.current);
  }, [filterStatus]);

  useEffect(() => {
    socketRef.current = io(SOCKET_URL);

    socketRef.current.on("connect", () => {
      console.log("✅ Connected to socket server");
    });

    socketRef.current.on("newOrder", (order) => {
      toast.success(`New order received! #${order.orderId}`);
      if (soundEnabled) alertSound.current.play();
      fetchOrders();
      fetchLowStockItems();

      setHighlightedOrderIds((prev) => [...prev, order._id]);
      setTimeout(() => {
        setHighlightedOrderIds((prev) => prev.filter((id) => id !== order._id));
      }, 5000);
    });

    socketRef.current.on("orderProcessed", (orderId) => {
      toast.success(`Order #${orderId} completed`);
      fetchOrders();
      fetchLowStockItems();
    });

    return () => socketRef.current.disconnect();
  }, [soundEnabled]);

  const handleProcessOrder = async (orderId) => {
    try {
      await axios.put(`${SOCKET_URL}/kitchen/process/${orderId}`);
      toast.success("Order processed!");
      socketRef.current.emit("orderProcessed", orderId);
      fetchOrders();
      fetchLowStockItems();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to process order");
    }
  };

  const getTimeAgo = (timestamp) => {
    const diff = Math.floor((Date.now() - new Date(timestamp)) / 60000);
    return diff < 1 ? "Just now" : `${diff} min${diff > 1 ? "s" : ""} ago`;
  };

  const exportOrdersToCSV = () => {
    const dataToExport = filteredOrders.map((order) => ({
      orderId: order._id,
      orderType: order.orderType,
      items: order.menuItems.map((item) => `${item.menu_id.name} x${item.quantity}`).join(", "),
      status: order.orderStatus,
      createdAt: order.createdAt,
    }));

    const csv = Papa.unparse(dataToExport);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    saveAs(blob, `orders-${filterStatus}.csv`);
  };

  const filteredOrders = orders
    .filter((order) => (filterStatus === "pending" ? order.orderStatus === "On-Progress" : order.orderStatus === "Completed"))
    .filter((order) => (orderTypeFilter === "all" ? true : order.orderType === orderTypeFilter));

  return (
    <div className="max-w-7xl mx-auto p-6">
      <audio ref={alertSound} src="/alert.mp3" preload="auto" />

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Kitchen Dashboard</h1>
        <button
          onClick={exportOrdersToCSV}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Export CSV
        </button>
      </div>

      {/* CONTROLS */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
        <div className="flex gap-2">
          <button
            className={`px-4 py-2 rounded ${filterStatus === "pending" ? "bg-green-600 text-white" : "bg-gray-200"}`}
            onClick={() => setFilterStatus("pending")}
          >
            Pending Orders
          </button>
          <button
            className={`px-4 py-2 rounded ${filterStatus === "completed" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
            onClick={() => setFilterStatus("completed")}
          >
            Completed Orders
          </button>
        </div>

        <div className="flex gap-2 items-center">
          <label className="font-medium">Order Type:</label>
          <select
            value={orderTypeFilter}
            onChange={(e) => setOrderTypeFilter(e.target.value)}
            className="border px-3 py-1 rounded"
          >
            <option value="all">All</option>
            <option value="dine-in">Dine-in</option>
            <option value="takeaway">Takeaway</option>
            <option value="delivery">Delivery</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="font-medium">Sound Alerts</label>
          <input
            type="checkbox"
            checked={soundEnabled}
            onChange={() => setSoundEnabled((prev) => !prev)}
            className="w-4 h-4"
          />
        </div>
      </div>

      {/* LOW STOCK */}
      <div className="mb-6">
        <h2 className="font-semibold mb-1">Low Stock Items:</h2>
        {lowStockItems.length === 0 ? (
          <p className="text-green-600">All stocks are sufficient</p>
        ) : (
          <ul className="text-red-600 list-disc pl-4">
            {lowStockItems.map((item) => (
              <li key={item._id}>
                {item.name} — {item.quantity} {item.unit} left
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* ORDERS TABLE */}
      <table className="w-full border border-gray-300 rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border">Order ID</th>
            <th className="p-3 border">Items</th>
            <th className="p-3 border">Type</th>
            <th className="p-3 border">Time</th>
            {filterStatus === "pending" && <th className="p-3 border">Action</th>}
          </tr>
        </thead>
        <tbody>
          {filteredOrders.length === 0 ? (
            <tr>
              <td colSpan={filterStatus === "pending" ? 5 : 4} className="text-center p-6">
                No {filterStatus} orders
              </td>
            </tr>
          ) : (
            filteredOrders.map((order) => (
              <tr
                key={order._id}
                className={`border-t transition-all duration-500 ${
                  highlightedOrderIds.includes(order._id)
                    ? "bg-yellow-200 animate-pulse"
                    : filterStatus === "pending"
                    ? "bg-yellow-50"
                    : "bg-green-50"
                }`}
              >
                <td className="p-3 border">{order._id.slice(-6)}</td>
                <td className="p-3 border">
                  {order.menuItems.map((item) => `${item.menu_id.name} x${item.quantity}`).join(", ")}
                </td>
                <td className="p-3 border capitalize">{order.orderType}</td>
                <td className="p-3 border">{getTimeAgo(order.createdAt)}</td>
                {filterStatus === "pending" && (
                  <td className="p-3 border">
                    <button
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                      onClick={() => handleProcessOrder(order._id)}
                    >
                      Mark as Done
                    </button>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
