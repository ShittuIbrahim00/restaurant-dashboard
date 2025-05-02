import { useEffect, useState } from "react";
import axios from "axios";
import { Search } from "lucide-react";
axios.defaults.withCredentials = true;

const StockMovements = () => {
    const restaurantURL = "https://restaurant-backend-wwjm.onrender.com/api/v1";
  const [movements, setMovements] = useState([]);
  const [search, setSearch] = useState("");
  const token = JSON.parse(localStorage.getItem("restaurant-user"));

  useEffect(() => {
    const fetchMovements = async () => {
      try {
        const res = await axios.get(`${restaurantURL}/stocks`, {
          headers: { Authorization: `Bearer ${token.token}` },
        });
        setMovements(res.data);
      } catch (err) {
        console.error("Failed to fetch stock movements:", err);
      }
    };

    fetchMovements();
  }, []);

  const filtered = movements.filter((m) =>
    m.supplyItem?.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-[#fefaf6] min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Stock Movements</h1>
        <div className="flex items-center space-x-2 border px-2 py-1 rounded-xl">
          <Search className="w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search item"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="outline-none bg-transparent"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="min-w-[700px] w-full text-sm text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-600">
              <th className="p-3 font-medium">Item</th>
              <th className="p-3 font-medium">Type</th>
              <th className="p-3 font-medium">Quantity</th>
              <th className="p-3 font-medium">Date</th>
              <th className="p-3 font-medium">Notes</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((m, i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td className="p-3">{m.supplyItem?.name || "Unknown"}</td>
                <td className="p-3 capitalize">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      m.type === "purchase"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {m.type}
                  </span>
                </td>
                <td className="p-3">{m.quantity}</td>
                <td className="p-3">
                  {new Date(m.date).toLocaleString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
                <td className="p-3">{m.notes || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StockMovements;
