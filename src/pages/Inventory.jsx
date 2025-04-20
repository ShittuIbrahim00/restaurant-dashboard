import { useState } from "react";
import { BarChart2, Search, User } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Inventory = () => {
  const initialProductsData = [
    { name: "Fresh Salmon", stock: 45, reorder: 50, status: "Available" },
    { name: "Olive Oil", stock: 10, reorder: 20, status: "Low" },
    { name: "Spaghetti Pasta", stock: 50, reorder: 60, status: "Available" },
    { name: "Salt", stock: 60, reorder: 30, status: "Available" },
    { name: "Black Pepper", stock: 15, reorder: 20, status: "Low" },
    { name: "Butter", stock: 40, reorder: 50, status: "Available" },
    { name: "Chef's Knife", stock: 5, reorder: 20, status: "Available" },
    { name: "Cutting Board", stock: 0, reorder: 15, status: "Out of Stock" },
    {
      name: "Dishwashing Detergent",
      stock: 25,
      reorder: 20,
      status: "Available",
    },
    { name: "Mixing Bowls", stock: 25, reorder: 30, status: "Available" },
  ];

  const supplyData = [
    { month: "Mar", value: 160 },
    { month: "Apr", value: 150 },
    { month: "May", value: 170 },
    { month: "Jun", value: 160 },
    { month: "Jul", value: 300 },
    { month: "Aug", value: 180 },
    { month: "Sep", value: 220 },
    { month: "Oct", value: 210 },
  ];

  const [products, setProducts] = useState(initialProductsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

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

  const addProduct = () => {
    const name = prompt("Enter product name");
    const stock = parseInt(prompt("Enter stock quantity"), 10);
    const reorder = parseInt(prompt("Enter reorder threshold"), 10);
    if (!name || isNaN(stock) || isNaN(reorder)) return;

    let status = "Available";
    if (stock === 0) status = "Out of Stock";
    else if (stock < reorder) status = "Low";

    const newProduct = { name, stock, reorder, status };
    setProducts([...products, newProduct]);
  };

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
        {/* Supply Overview */}
        <div className="bg-white rounded-2xl shadow p-4 mb-6">
          <div className="text-lg font-semibold mb-2">Supply Overview</div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={supplyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#fb923c"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Stock Level */}
        <div className="bg-white rounded-2xl shadow p-4 mb-6">
          <div className="text-lg font-semibold mb-2">Stock Level</div>
          <div className="flex justify-between">
            <div>In Stock: {totalAvailable} Products</div>
            <div>Low Stock: {totalLow} Products</div>
            <div>Out of Stock: {totalOut} Products</div>
          </div>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-2xl shadow p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 mb-4 justify-center items-center">
          <input
            type="text"
            placeholder="Search for item"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-xl px-3 py-2 w-full"
          />
          <div className="space-x-2 flex mt-4 justify-center items-center">
            <button
              onClick={addProduct}
              className="bg-orange-500 text-white px-4 py-2 rounded-xl hover:bg-orange-600"
            >
              Add Product
            </button>
            <button
              onClick={exportCSV}
              className="bg-orange-200 text-orange-800 px-4 py-2 rounded-xl hover:bg-orange-300"
            >
              Export CSV
            </button>
          </div>
        </div>
        <div className="w-full overflow-x-auto rounded-xl shadow">
          <table className="min-w-[600px] w-full text-sm text-left border-collapse">
            <thead>
              <tr className="text-gray-500 border-b bg-gray-50">
                <th className="p-3 font-medium whitespace-nowrap">Item</th>
                <th className="p-3 font-medium whitespace-nowrap">
                  Qty in Stock
                </th>
                <th className="p-3 font-medium whitespace-nowrap">
                  Qty in Reorder
                </th>
                <th className="p-3 font-medium whitespace-nowrap">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((item, i) => (
                <tr key={i} className="border-b hover:bg-gray-50">
                  <td className="p-3">{item.name}</td>

                  <td className="p-3 min-w-[180px]">
                    <div className="bg-gray-200 rounded-full h-2 w-full mb-1">
                      <div
                        className="bg-orange-500 h-full rounded-full"
                        style={{
                          width: `${Math.min(
                            (item.stock / item.reorder) * 100,
                            100
                          )}%`,
                        }}
                      />
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

                  <td className="p-3 whitespace-nowrap">{item.reorder}</td>

                  <td className="p-3 whitespace-nowrap space-x-2">
                    <button className="border border-orange-500 text-orange-500 px-3 py-1 rounded-xl hover:bg-orange-50">
                      Reorder
                    </button>
                    <button className="bg-gray-200 px-3 py-1 rounded-xl hover:bg-gray-300">
                      Update Stock
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center mt-4 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 rounded-full text-sm ${
                page === i + 1 ? "bg-orange-500 text-white" : "bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Inventory;
