import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { RiSearchLine } from "react-icons/ri";
import { BiCheckbox, BiPlus } from "react-icons/bi";
import { HiChevronUpDown } from "react-icons/hi2";
import { GoDotFill } from "react-icons/go";

const PurchaseOrder = () => {
  const initialData = [
    {
      food: "food ingredients",
      names: "Fresh Salmon",
      supplier: "ocean fresh suppliers",
      stock: "15.00",
      qty: 10,
      total: "150.00",
      reorder: 100,
      status: "pending",
    },
    {
      food: "food ingredients",
      names: "olive oil",
      supplier: "mediterranean oils co.",
      stock: "10.00",
      qty: 20,
      total: "200.00",
      reorder: 50,
      status: "shipped",
    },
    {
      food: "food ingredients",
      names: "spaghetti pasta",
      supplier: "italian imports",
      stock: "3.50",
      qty: 50,
      total: "175.00",
      reorder: 50,
      status: "delivered",
    },
    {
      food: "cleaning supplies",
      names: "dishwashing detergent",
      supplier: "cleanpro supplies",
      stock: "12.00",
      qty: 15,
      total: "180.00",
      reorder: 50,
      status: "pending",
    },
    {
      food: "kitchen tools & equipment",
      names: "espresso machine",
      supplier: "barista equipment inc",
      stock: "150.00",
      qty: 1,
      total: "150.00",
      reorder: 50,
      status: "delivered",
    },
    {
      food: "kitchen tools & equipment",
      names: "white plates",
      supplier: "kitchen essentials",
      stock: "2.00",
      qty: 100,
      total: "200.00",
      reorder: 50,
      status: "shipped",
    },
    {
      food: "food ingredients",
      names: "garlic cloves",
      supplier: "organic farms",
      stock: "1.00",
      qty: 100,
      total: "100.00",
      reorder: 100,
      status: "pending",
    },
    {
      food: "cleaning supplies",
      names: "trash bags",
      supplier: "green cleaning solutions",
      stock: "0.50",
      qty: 200,
      total: "100.00",
      reorder: 50,
      status: "delivered",
    },
    {
      food: "food ingredients",
      names: "butter",
      supplier: "dairy delights",
      stock: "4.00",
      qty: 30,
      total: "120.00",
      reorder: 100,
      status: "shipped",
    },
    {
      food: "kitchen tools & equipment",
      names: "mixing bowls",
      supplier: "kitchen supplies hub",
      stock: "5.00",
      qty: 10,
      total: "50.00",
      reorder: 50,
      status: "pending",
    },
  ];

  const [products, setProducts] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const itemsPerPage = 6;

  const handleAddPurchase = (e) => {
    e.preventDefault();
    const newProduct = {
      food,
      names,
      supplier,
      stock,
      qty,
      total: (parseFloat(stock) * parseInt(qty)).toFixed(2),
      reorder: 50,
      status,
    };
    setProducts([newProduct, ...products]);
    setShowForm(false);
    setFood("");
    setNames("");
    setSupplier("");
    setStock("");
    setQty("");
    setStatus("pending");
  };

  const [food, setFood] = useState("");
  const [names, setNames] = useState("");
  const [supplier, setSupplier] = useState("");
  const [stock, setStock] = useState("");
  const [qty, setQty] = useState("");
  const [status, setStatus] = useState("pending");

  const filtered = products
    .filter((p) =>
      p.names.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((p) => (filter === "All" ? true : p.status === filter.toLowerCase()));

  const sorted = [...filtered].sort((a, b) => a.names.localeCompare(b.names));
  const paginated = sorted.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  return (
    <div className="p-4 md:p-6 bg-white min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-8">
        <div className="flex flex-wrap gap-2 text-sm md:text-base text-gray-500 bg-gray-200 px-3 py-2 rounded-lg">
          {["All", "Pending", "Shipped", "Delivered"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1 rounded-lg ${
                filter === f ? "bg-orange-600 text-white" : ""
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="flex items-center bg-orange-100 rounded-lg px-2 py-1">
            <RiSearchLine size={20} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search item"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent outline-none ml-2"
            />
          </div>
          <button className="flex items-center gap-2 text-sm text-gray-600">
            All Category <IoIosArrowDown />
          </button>
          <button
            className="flex items-center gap-2 bg-orange-600 text-white px-3 py-2 rounded-lg"
            onClick={() => setShowForm(!showForm)}
          >
            <BiPlus /> Add Purchase
          </button>
        </div>
      </div>

      {showForm && (
        <form
          onSubmit={handleAddPurchase}
          className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-100 p-4 rounded-lg"
        >
          <input
            className="p-2 rounded border"
            placeholder="Category"
            value={food}
            onChange={(e) => setFood(e.target.value)}
            required
          />
          <input
            className="p-2 rounded border"
            placeholder="Item Name"
            value={names}
            onChange={(e) => setNames(e.target.value)}
            required
          />
          <input
            className="p-2 rounded border"
            placeholder="Supplier"
            value={supplier}
            onChange={(e) => setSupplier(e.target.value)}
            required
          />
          <input
            type="number"
            className="p-2 rounded border"
            placeholder="Price"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />
          <input
            type="number"
            className="p-2 rounded border"
            placeholder="Quantity"
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            required
          />
          <select
            className="p-2 rounded border"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="pending">Pending</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
          </select>
          <button
            type="submit"
            className="col-span-full bg-orange-500 text-white py-2 rounded mt-2"
          >
            Submit Purchase
          </button>
        </form>
      )}

      <div className="w-full overflow-x-auto border-b mt-6">
        <table className="min-w-[600px] w-full text-sm text-left border-collapse">
          <thead>
            <tr className="border-b">
              <th className="p-3 font-medium whitespace-nowrap flex items-center gap-2">
                <BiCheckbox size={20} />
                Order ID
              </th>
              <th className="p-3 font-medium whitespace-nowrap">Item</th>
              <th className="p-3 font-medium whitespace-nowrap">Price</th>
              <th className="p-3 font-medium whitespace-nowrap">Qty</th>
              <th className="p-3 font-medium whitespace-nowrap">Total</th>
              <th className="p-3 font-medium whitespace-nowrap">Delivery Status</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((item, i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <BiCheckbox size={20} />
                    <div className="font-semibold text-gray-500">
                      <h2>PO100{i + 1}</h2>
                      <span>05/10/35</span>
                    </div>
                  </div>
                </td>
                <td className="p-2">
                  <div className="text-gray-700">
                    <h2 className="text-orange-600">{item.food}</h2>
                    <h1 className="font-bold text-black">{item.names}</h1>
                    <p className="text-xs">{item.supplier}</p>
                  </div>
                </td>
                <td className="p-3 text-orange-600">${item.stock}</td>
                <td className="p-3">{item.qty}</td>
                <td className="p-3 text-orange-600">${item.total}</td>
                <td className="p-3">
                  <div className="flex items-center gap-1 mb-1">
                    <GoDotFill className="text-orange-500" />
                    <span className="capitalize font-semibold">{item.status}</span>
                  </div>
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
                    Arrival: Oct 07, 2025
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
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
  );
};

export default PurchaseOrder;
