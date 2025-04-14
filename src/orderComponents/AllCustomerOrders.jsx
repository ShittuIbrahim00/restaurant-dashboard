import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiInfo,
  FiCreditCard,
  FiList,
  FiCheckCircle,
  FiXCircle,
  FiClock,
} from "react-icons/fi";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { saveAs } from "file-saver";
import { Link } from "react-router-dom";

const orders = [
  {
    id: "ORD1023",
    customer: "Alice Johnson",
    status: "completed",
    date: "Sat, October 20, 2035, 02:47 PM",
    diningOption: "Dine-In, Table 12",
    total: "$26.00",
    items: [
      {
        name: "Cheeseburger",
        quantity: 1,
        price: "$10.00",
        image:
          "https://www.georgeinstitute.org/sites/default/files/2020-10/world-food-day-2020.png",
      },
      {
        name: "French Fries",
        quantity: 1,
        price: "$4.00",
        image:
          "https://www.georgeinstitute.org/sites/default/files/2020-10/world-food-day-2020.png",
      },
      {
        name: "Coke",
        quantity: 1,
        price: "$2.00",
        image: "https://source.unsplash.com/100x100/?soda",
      },
    ],
  },
  {
    id: "ORD1024",
    customer: "Bob Smith",
    status: "pending",
    date: "Sun, October 21, 2035, 01:15 PM",
    diningOption: "Takeaway",
    total: "$18.00",
  },
  {
    id: "ORD1025",
    customer: "Carol Adams",
    status: "cancelled",
    date: "Sun, October 21, 2035, 03:00 PM",
    diningOption: "Online Order",
    total: "$30.00",
  },
  {
    id: "ORD1026",
    customer: "Dan Brown",
    status: "completed",
    date: "Sat, October 22, 2035, 04:10 PM",
    diningOption: "Dine-In, Table 9",
    total: "$45.00",
  },
  {
    id: "ORD1027",
    customer: "Eve Black",
    status: "pending",
    date: "Sat, October 22, 2035, 06:30 PM",
    diningOption: "Takeaway",
    total: "$20.00",
  },
  {
    id: "ORD1028",
    customer: "Frank Miller",
    status: "completed",
    date: "Sun, October 23, 2035, 12:00 PM",
    diningOption: "Dine-In, Table 15",
    total: "$50.00",
  },
];

const AllCustomerOrder = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [sortConfig, setSortConfig] = useState({
    key: "customer",
    direction: "asc",
  });

  const parseCurrency = (str) => parseFloat(str.replace("$", ""));

  const sortedOrders = [...orders].sort((a, b) => {
    let aVal =
      sortConfig.key === "total"
        ? parseCurrency(a[sortConfig.key])
        : a[sortConfig.key];
    let bVal =
      sortConfig.key === "total"
        ? parseCurrency(b[sortConfig.key])
        : b[sortConfig.key];

    if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
    if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const filteredOrders =
    activeTab === "all"
      ? sortedOrders
      : sortedOrders.filter((order) => order.status === activeTab);

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <FiCheckCircle className="text-green-500 inline-block mr-1" />;
      case "pending":
        return <FiClock className="text-yellow-500 inline-block mr-1" />;
      case "cancelled":
        return <FiXCircle className="text-red-500 inline-block mr-1" />;
      default:
        return <FiList className="inline-block mr-1" />;
    }
  };

  const handleSort = (key) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    setSortConfig({ key, direction });
  };

  const exportDOCX = () => {
    const doc = `
      <w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
        <w:body>
          <w:table>
            <w:tr>
              <w:tc><w:p><w:r><w:t>Customer</w:t></w:r></w:p></w:tc>
              <w:tc><w:p><w:r><w:t>Date</w:t></w:r></w:p></w:tc>
              <w:tc><w:p><w:r><w:t>Status</w:t></w:r></w:p></w:tc>
              <w:tc><w:p><w:r><w:t>Dining Option</w:t></w:r></w:p></w:tc>
              <w:tc><w:p><w:r><w:t>Total</w:t></w:r></w:p></w:tc>
            </w:tr>
            ${filteredOrders
              .map(
                (order) => `
                <w:tr>
                  <w:tc><w:p><w:r><w:t>${order.customer}</w:t></w:r></w:p></w:tc>
                  <w:tc><w:p><w:r><w:t>${order.date}</w:t></w:r></w:p></w:tc>
                  <w:tc><w:p><w:r><w:t>${order.status}</w:t></w:r></w:p></w:tc>
                  <w:tc><w:p><w:r><w:t>${order.diningOption}</w:t></w:r></w:p></w:tc>
                  <w:tc><w:p><w:r><w:t>${order.total}</w:t></w:r></w:p></w:tc>
                </w:tr>
              `
              )
              .join("")}
          </w:table>
        </w:body>
      </w:document>
    `;

    const zip = new PizZip(doc);
    const docx = new Docxtemplater(zip);
    const output = docx.getZip().generate({ type: "blob" });
    saveAs(output, "orders.docx");
  };

  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredOrders);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Orders");
    XLSX.writeFile(wb, "orders.xlsx");
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [["Customer", "Date", "Status", "Dining Option", "Total"]],
      body: filteredOrders.map((order) => [
        order.customer,
        order.date,
        order.status,
        order.diningOption,
        order.total,
      ]),
    });
    doc.save("orders.pdf");
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow">
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {["all", "pending", "completed", "cancelled"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeTab === tab
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)} Orders
          </button>
        ))}
      </div>

      {/* Sort and Export */}
      <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
        <div className="flex gap-2">
          <button
            onClick={() => handleSort("customer")}
            className="px-3 py-1 bg-gray-100 rounded"
          >
            Sort by Name
          </button>
          <button
            onClick={() => handleSort("total")}
            className="px-3 py-1 bg-gray-100 rounded"
          >
            Sort by Total
          </button>
        </div>
        <div className="flex gap-2">
          <button
            onClick={exportExcel}
            className="px-3 py-1 bg-gray-200 rounded"
          >
            Excel
          </button>
          <button onClick={exportPDF} className="px-3 py-1 bg-gray-200 rounded">
            PDF
          </button>
          <button
            onClick={exportDOCX}
            className="px-3 py-1 bg-gray-200 rounded"
          >
            DOCX
          </button>
        </div>
      </div>

      {/* Orders Grid */}
      <motion.div
        className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => {
            const subtotal = parseCurrency(order.total);
            const tax = +(subtotal * 0.1).toFixed(2); // 10% tax
            const totalWithTax = (subtotal + tax).toFixed(2);

            return (
              <div
                key={order.id}
                className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="mb-2">
                  <h4 className="font-bold text-lg text-gray-800">
                    {order.customer}
                  </h4>
                  <p className="text-sm text-gray-500">{order.date}</p>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  <span className="font-semibold">Status:</span>{" "}
                  {getStatusIcon(order.status)}
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Dining Option:</span>{" "}
                  {order.diningOption}
                </p>
                {order.items && order.items.length > 0 && (
                  <div className="mt-4 border-t pt-2">
                    <h5 className="font-semibold mb-2 text-sm text-gray-700">
                      Items Ordered:
                    </h5>
                    <div className="space-y-2">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div className="text-sm">
                            <p className="font-medium">{item.name}</p>
                            <p className="text-gray-500">
                              Qty: {item.quantity} — {item.price}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="text-sm text-gray-600 mt-2">
                  <p>Subtotal: ${subtotal.toFixed(2)}</p>
                  <p>Tax (10%): ${tax}</p>
                  <p className="font-bold">Total: ${totalWithTax}</p>
                </div>
                <div className="flex justify-end mt-4 space-x-2">
                  <Link to={`/orders/${order.id}`}>
                    <button className="flex items-center gap-1 px-3 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                      <FiInfo /> See Details
                    </button>
                  </Link>
                  <button className="flex items-center gap-1 px-3 py-2 text-sm bg-green-500 text-white rounded-lg hover:bg-green-600">
                    <FiCreditCard /> Pay Bill
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-gray-600">No orders found.</p>
        )}
      </motion.div>
    </div>
  );
};

export default AllCustomerOrder;
