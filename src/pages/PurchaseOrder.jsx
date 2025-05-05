import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { RiSearchLine } from "react-icons/ri";
import { BiCheckbox, BiPlus } from "react-icons/bi";
import { HiChevronUpDown } from "react-icons/hi2";
import { GoDotFill } from "react-icons/go";

const PurchaseOrder = () => {
  const ProductsData = [
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

  const [products, setProducts] = useState(ProductsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  const filtered = products.filter((p) =>
    p.names.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) => a.names.localeCompare(b.names));
  const paginated = sorted.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="flex justify-between items-center">
        <div className="flex justify-between items-center gap-8 text-gray-500 bg-gray-200 px-3 py-2 rounded-lg">
          <p className="bg-orange-600 px-8 py-1 rounded-lg text-white">All</p>
          <p>Pending</p>
          <p>Shipped</p>
          <p>Delivered</p>
        </div>
        <div className="flex items-center gap-6">
          <RiSearchLine
            size={35}
            className="bg-orange-100 text-gray-500 rounded-lg flex items-center px-2 py-1"
          />
          <p className="flex items-center gap-2">
            All Category <IoIosArrowDown />
          </p>
          <p className="flex items-center gap-4 bg-orange-600 text-white px-3 py-2 rounded-lg">
            <BiPlus /> Add Purchase
          </p>
        </div>
      </div>
      <div className="w-full overflow-x-auto border-b capitalize mt-6">
        <table className="min-w-[600px] w-full text-sm text-left border-collapse">
          <thead>
            <tr className=" border-b">
              <th className="p-3 font-medium whitespace-nowrap gap-2 flex items-center">
                <BiCheckbox size={20} color="gray" />
                <div className="flex items-center gap-1">
                  order id <HiChevronUpDown />
                </div>
              </th>
              <th className="p-3 font-medium whitespace-nowrap">
                <div className="flex items-center gap-1">
                  item <HiChevronUpDown />
                </div>
              </th>
              <th className="p-3 font-medium whitespace-nowrap">
                <div className="flex items-center gap-1">
                  price <HiChevronUpDown />
                </div>
              </th>
              <th className="p-3 font-medium whitespace-nowrap">
                <div className="flex items-center gap-1">
                  qty
                  <HiChevronUpDown />
                </div>
              </th>
              <th className="p-3 font-medium whitespace-nowrap">
                <div className="flex items-center gap-1">
                  total
                  <HiChevronUpDown />
                </div>
              </th>{" "}
              <th className="p-3 font-medium whitespace-nowrap">
                <div className="flex items-center gap-1">
                  delivery status
                  <HiChevronUpDown />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((item, i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <BiCheckbox size={20} color="gray" />
                    <div className="font-semibold text-gray-500">
                      <h2>PO1001</h2>
                      <span>05/10/35</span>
                    </div>
                  </div>
                </td>
                <td className="p-2">
                  <div className="font-semibold text-gray-500">
                    <h2 className="text-orange-600">{item.food}</h2>
                    <h1 className="font-bold text-black">{item.names}</h1>
                    <p>{item.supplier}</p>
                  </div>
                </td>
                <td className="pl-3">
                  <span className="text-orange-600">${item.stock}</span>
                </td>
                <td className="pl-4">
                  <span className="text-black">{item.qty}</span>
                </td>
                <td className="pl-4">
                  <span className="text-orange-600">${item.total}</span>
                </td>
                <td className="p-3">
                  <div
                    className={`font-bold mb-2 inline-block px-2 py-1 rounded-2xl ${
                      item.status === "Low"
                        ? "bg-orange-200 text-orange-800"
                        : item.status === "Out of Stock"
                        ? "bg-gray-300 text-gray-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    <p className="flex gap-1 text-black items-center">
                      {" "}
                      <GoDotFill />
                      {item.status}
                    </p>
                  </div>
                  <div className="bg-gray-200 rounded-full h-2 w-fu mb-1">
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
                  <div className="text-xs text-gray-600 flex gap-1">
                    <p>Arrival:</p>
                    <span>Oct 07, 2025</span>
                  </div>
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
  );
};

export default PurchaseOrder;
