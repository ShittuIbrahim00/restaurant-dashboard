import { useEffect, useState } from "react";
import { BarChart2, Search, User } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from "recharts";
import axios from "axios";

axios.defaults.withCredentials = true;

const formatToK = (value) => {
  return value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value;
};

const Inventory = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showStockMovementModal, setShowStockMovementModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [newItem, setNewItem] = useState({ name: "", stock: "", reorder: "" });
  const [updateQty, setUpdateQty] = useState("");
  const [movementQty, setMovementQty] = useState("");
  const [movementType, setMovementType] = useState("purchase");

  const itemsPerPage = 5;
  const token = JSON.parse(localStorage.getItem("restaurant-user"));

  // const supplyData = [
  //   { month: "Mar", value: 160 },
  //   { month: "Apr", value: 150 },
  //   { month: "May", value: 170 },
  //   { month: "Jun", value: 160 },
  //   { month: "Jul", value: 300 },
  //   { month: "Aug", value: 180 },
  //   { month: "Sep", value: 220 },
  //   { month: "Oct", value: 210 },
  // ];

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/v1/inventories",
          { headers: { Authorization: `Bearer ${token.token}` } }
        );
        const data = res.data.map((item) => {
          let status = "Available";
          if (item.quantity === 0) status = "Out of Stock";
          else if (item.quantity < item.reorderPoint) status = "Low";
          return {
            id: item._id,
            name: item.name,
            stock: item.quantity,
            reorder: item.reorderPoint,
            status,
          };
        });
        console.log(data);
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to load inventory:", error);
        setLoading(false);
      }
    };

    fetchInventory();
  }, []);

  const handleAddProduct = async () => {
    const { name, stock, reorder } = newItem;
    if (!name || isNaN(stock) || isNaN(reorder)) {
      alert("Please fill in all fields correctly.");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/create-inventory",
        {
          name,
          quantity: parseInt(stock),
          reorderPoint: parseInt(reorder),
          unit: "pcs",
          supplierInfo: { name: "Default Supplier", contact: "N/A" },
        },
        {
          headers: { Authorization: `Bearer ${token.token}` },
        }
      );

      const item = res.data;
      let status = "Available";
      if (item.quantity === 0) status = "Out of Stock";
      else if (item.quantity < item.reorderPoint) status = "Low";

      setProducts((prev) => [
        ...prev,
        {
          id: item._id,
          name: item.name,
          stock: item.quantity,
          reorder: item.reorderPoint,
          status,
        },
      ]);
      setShowAddModal(false);
      setNewItem({ name: "", stock: "", reorder: "" });
    } catch (err) {
      alert("Failed to add item.");
      console.error(err);
    }
  };

  const handleUpdateStock = async () => {
    if (isNaN(updateQty)) return;

    try {
      const res = await axios.put(
        `http://localhost:5000/api/v1/inventory?id=${selectedItem.id}`,
        {
          quantity: parseInt(updateQty),
        },
        {
          headers: { Authorization: `Bearer ${token.token}` },
        }
      );

      const updated = res.data;
      let status = "Available";
      if (updated.quantity === 0) status = "Out of Stock";
      else if (updated.quantity < updated.reorderPoint) status = "Low";

      setProducts((prev) =>
        prev.map((p) =>
          p.id === updated._id
            ? {
                ...p,
                stock: updated.quantity,
                reorder: updated.reorderPoint,
                status,
              }
            : p
        )
      );
      setShowUpdateModal(false);
      setUpdateQty("");
    } catch (err) {
      alert("Failed to update stock");
      console.error(err);
    }
  };

  const handleStockMovement = async () => {
    if (isNaN(movementQty)) return;

    try {
      const res = await axios.post(
        `http://localhost:5000/api/v1/create-stock`,
        {
          supplyItem: selectedItem.id,
          type: movementType,
          quantity: parseInt(movementQty),
          notes: `Stock movement of ${movementType}`,
        },
        {
          headers: { Authorization: `Bearer ${token.token}` },
        }
      );

      const updated = res.data;
      let status = "Available";
      if (updated.quantity === 0) status = "Out of Stock";
      else if (updated.quantity < updated.reorderPoint) status = "Low";

      setProducts((prev) =>
        prev.map((p) =>
          p.id === selectedItem.id
            ? { ...p, stock: updated.quantity, status }
            : p
        )
      );

      setShowStockMovementModal(false);
      setMovementQty("");
    } catch (err) {
      alert("Failed to create stock movement");
      console.error(err);
    }
  };

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const sorted = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
  const paginated = sorted.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const totalAvailable = products.filter(
    (p) => p.status === "Available"
  ).length;
  const totalLow = products.filter((p) => p.status === "Low").length;
  const totalOut = products.filter((p) => p.status === "Out of Stock").length;

  const [supplyData, setSupplyData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/v1/stock/trend")
      .then((res) => {
        // Format the fetched data as per chart requirement
        setSupplyData(res.data); // Expecting [{ month: "Jan 2025", purchase: 120, usage: 50 }, ...]
      })
      .catch((error) => {
        console.error("Error fetching supply data:", error);
      });
  }, []);

  if (!supplyData || supplyData.length === 0) {
    return <p>No data available</p>;
  }

  const exportCSV = () => {
    const headers = ["Name", "Stock", "Reorder", "Status"];
    const rows = products.map((p) => [p.name, p.stock, p.reorder, p.status]);
    const csvContent = [headers, ...rows]
      .map((row) => row.join(","))
      .join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "inventory.csv";
    link.click();
  };

  return (
    <div className="p-6 bg-[#fefaf6] text-[#1f1f1f] min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Inventory</h1>
        <div className="flex items-center gap-4">
          <Search className="w-5 h-5" />
          <BarChart2 className="w-5 h-5" />
          <User className="w-8 h-8 rounded-full border" />
        </div>
      </div>

      <div className="grid justify-between md:grid-cols-2 gap-2">
      <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={supplyData}
        margin={{ top: 20, right: 30, left: 20, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
        <XAxis
          dataKey="month"
          stroke="#555"
          tick={{ fontSize: 14 }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(tick) => tick}
        />
        <YAxis
          stroke="#555"
          tickFormatter={formatToK}
          tick={{ fontSize: 14 }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          formatter={(value) => formatToK(value)}
          contentStyle={{
            fontSize: "14px",
            backgroundColor: "#333",
            borderRadius: "8px",
            padding: "8px",
            color: "#fff",
          }}
          labelStyle={{ color: "#555", fontWeight: "bold" }}
        />
        <Legend
          verticalAlign="top"
          align="center"
          iconType="circle"
          iconSize={10}
          wrapperStyle={{
            paddingTop: "10px",
            fontSize: "14px",
            color: "#555",
          }}
        />
        <Line
          type="monotone"
          dataKey="purchase"
          stroke="#FF7043"
          name="Purchased"
          strokeWidth={3}
          dot={{ r: 4, fill: "#FF7043" }}
          activeDot={{ r: 6 }}
        />
        <Line
          type="monotone"
          dataKey="usage"
          stroke="#66BB6A"
          name="Used"
          strokeWidth={3}
          dot={{ r: 4, fill: "#66BB6A" }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>

        <div className="bg-white rounded-2xl shadow p-6 mb-6">
          <div className="text-lg font-semibold text-gray-800 mb-4">
            Stock Level
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-700">
            <div className="flex items-center justify-between bg-green-50 border border-green-200 p-4 rounded-xl">
              <span className="font-medium">In Stock</span>
              <span className="text-green-700 font-semibold">
                {totalAvailable} Products
              </span>
            </div>
            <div className="flex items-center justify-between bg-orange-50 border border-orange-200 p-4 rounded-xl">
              <span className="font-medium">Low Stock</span>
              <span className="text-orange-600 font-semibold">
                {totalLow} Products
              </span>
            </div>
            <div className="flex items-center justify-between bg-gray-100 border border-gray-300 p-4 rounded-xl">
              <span className="font-medium">Out of Stock</span>
              <span className="text-gray-700 font-semibold">
                {totalOut} Products
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 mb-4">
          <input
            type="text"
            placeholder="Search for item"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-xl px-3 py-2 w-full"
          />
          <div className="space-x-2 flex mt-4 justify-center items-center">
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-orange-500 text-white px-4 py-2 rounded-xl hover:bg-orange-600"
            >
              Add Product
            </button>
            <button
              onClick={exportCSV}
              className="bg-orange-200 text-orange-800 px-4 py-2 rounded-xl hover:bg-orange-300"
            >
              Export to CSV
            </button>
          </div>
        </div>

        <div className="w-full overflow-x-auto rounded-xl shadow">
          <table className="min-w-[600px] w-full text-sm text-left border-collapse">
            <thead>
              <tr className="text-gray-500 border-b bg-gray-50">
                <th className="p-3 font-medium">Item</th>
                <th className="p-3 font-medium">Qty in Stock</th>
                <th className="p-3 font-medium">Qty in Reorder</th>
                <th className="p-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="4" className="text-center p-4">
                    Loading...
                  </td>
                </tr>
              ) : (
                paginated.map((item, i) => (
                  <tr key={i} className="border-b hover:bg-gray-50">
                    <td className="p-3">{item.name}</td>
                    <td className="p-3 min-w-[180px]">
                      <div className="bg-gray-200 rounded-full h-2 w-full mb-1">
                        {(() => {
                          const reorder = item.reorder || 1; // prevent divide by zero
                          const percent = Math.min(
                            (item.stock / (reorder * 2)) * 100,
                            100
                          );
                          let barColor = "bg-green-500";
                          if (item.stock < item.reorder) {
                            barColor = "bg-red-500";
                          } else if (item.stock < item.reorder * 1.2) {
                            barColor = "bg-orange-500";
                          }

                          return (
                            <div
                              className={`h-full rounded-full transition-all duration-300 ${barColor}`}
                              style={{ width: `${percent}%` }}
                            />
                          );
                        })()}
                      </div>

                      <div className="text-xs text-gray-600">
                        {item.stock} units in store
                      </div>
                      <span
                        className={`text-xs mt-1 inline-block px-2 py-1 rounded ${
                          item.status === "Low"
                            ? "bg-orange-200 text-orange-800"
                            : item.status === "Out of Stock"
                            ? "bg-gray-300 text-gray-700"
                            : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="p-3">{item.reorder}</td>
                    <td className="p-3 space-x-2">
                      <button
                        onClick={() => {
                          setSelectedItem(item);
                          setShowUpdateModal(true);
                        }}
                        className="border border-orange-500 text-orange-500 px-3 py-1 rounded-xl hover:bg-orange-50"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => {
                          setSelectedItem(item);
                          setShowStockMovementModal(true);
                        }}
                        className="bg-gray-200 px-3 py-1 rounded-xl hover:bg-gray-300"
                      >
                        Move Stock
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex justify-center">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-orange-200 text-orange-800 rounded-xl"
          >
            Previous
          </button>
          <span className="px-4 py-2">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="px-4 py-2 bg-orange-200 text-orange-800 rounded-xl"
          >
            Next
          </button>
        </div>
      </div>
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-sm w-full">
            <h3 className="text-xl font-semibold mb-4">Add New Product</h3>
            <input
              type="text"
              placeholder="Product Name"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              className="mb-4 p-2 w-full border border-gray-300 rounded"
            />
            <input
              type="number"
              placeholder="Stock"
              value={newItem.stock}
              onChange={(e) =>
                setNewItem({ ...newItem, stock: e.target.value })
              }
              className="mb-4 p-2 w-full border border-gray-300 rounded"
            />
            <input
              type="number"
              placeholder="Reorder Point"
              value={newItem.reorder}
              onChange={(e) =>
                setNewItem({ ...newItem, reorder: e.target.value })
              }
              className="mb-4 p-2 w-full border border-gray-300 rounded"
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleAddProduct}
                className="px-4 py-2 bg-orange-500 text-white rounded"
              >
                Add Product
              </button>
            </div>
          </div>
        </div>
      )}
      {showStockMovementModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-sm w-full">
            <h3 className="text-xl font-semibold mb-4">Stock Movement</h3>
            <input
              type="number"
              placeholder="Quantity"
              value={movementQty}
              onChange={(e) => setMovementQty(e.target.value)}
              className="mb-4 p-2 w-full border border-gray-300 rounded"
            />
            <select
              value={movementType}
              onChange={(e) => setMovementType(e.target.value)}
              className="mb-4 p-2 w-full border border-gray-300 rounded"
            >
              <option value="purchase">Purchase</option>
              <option value="usage">Usage</option>
            </select>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowStockMovementModal(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleStockMovement}
                className="px-4 py-2 bg-orange-500 text-white rounded"
              >
                Log Movement
              </button>
            </div>
          </div>
        </div>
      )}
      {showUpdateModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-sm w-full">
            <h3 className="text-xl font-semibold mb-4">Update Stock</h3>
            <input
              type="number"
              placeholder="New Stock Quantity"
              value={updateQty}
              onChange={(e) => setUpdateQty(e.target.value)}
              className="mb-4 p-2 w-full border border-gray-300 rounded"
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowUpdateModal(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateStock}
                className="px-4 py-2 bg-orange-500 text-white rounded"
              >
                Update Stock
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;
