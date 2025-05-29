import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const Tables = () => {
  const checkUser = JSON.parse(localStorage.getItem("restaurant-user"));
  const userRole = checkUser.user.token;

  const [category, setCategory] = useState([]);
  const [data, setData] = useState({
    tableNumber: "",
    capacity: "",
    price: "",
    categoryId: "",
  });
  const [editingTableId, setEditingTableId] = useState(null);
  const [error, setError] = useState("");
  const [error1, setError1] = useState("");
  const [loader, setLoader] = useState(false);
  const [name, setName] = useState("");
  const [showTableModal, setShowTableModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const statusColors = {
    available: "bg-green-400",
    reserved: "bg-red-500",
  };

  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [reservationFilter, setReservationFilter] = useState("All");
  const [selectedTableDetails, setSelectedTableDetails] = useState(null);

  const fetchTable = async () => {
    try {
      const resp = await axios.get(
        "https://restaurant-backend-wwjm.onrender.com/api/v1/get-all-table",
        {
          headers: { Authorization: `Bearer ${userRole}` },
        }
      );
      if (resp.data.success) {
        setTables(resp.data.data);
      }
    } catch (error) {
      console.error("Error fetching tables:", error);
    }
  };

  useEffect(() => {
    fetchTable();
  }, []);

  const categories = [
    "All",
    ...new Set(tables.map((t) => t.categoryId?.name).filter(Boolean)),
  ];

  const filteredTables = tables.filter((t) => {
    const categoryMatch =
      selectedCategory === "All" || t.categoryId?.name === selectedCategory;
    const reservationMatch =
      reservationFilter === "All" ||
      (reservationFilter === "Reserved" && t.isReserved) ||
      (reservationFilter === "Available" && !t.isReserved);
    return categoryMatch && reservationMatch;
  });

  const renderTable = (table) => {
    const isSelected = selectedTable === table._id;
    const status = table.isReserved ? "reserved" : "available";

    return (
      <motion.div
        key={table._id}
        onClick={() => {
          setSelectedTable(table._id);
          setSelectedTableDetails(table);
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative inline-flex items-center justify-center mx-2"
      >
        <motion.div
          layoutId={`table-${table._id}`}
          className={`flex flex-col items-center justify-center w-20 h-20 rounded-xl shadow-md border-2 text-white font-semibold cursor-pointer transition-all duration-300 ${
            isSelected ? "scale-105" : "border-transparent"
          } ${statusColors[status] || "bg-gray-300"}`}
        >
          <span className="text-sm">
            {table.tableNumber?.toString().padStart(2, "0")}
          </span>
          <span className="text-xs capitalize">{status}</span>
        </motion.div>
      </motion.div>
    );
  };

  useEffect(() => {
    const fetchCatgoryData = async () => {
      const resp = await axios.get(
        "https://restaurant-backend-wwjm.onrender.com/api/v1/get-all-category",
        { headers: { Authorization: `Bearer ${userRole}` } }
      );
      if (resp.data.sucess === true) {
        setCategory(resp.data.data);
      }
    };
    fetchCatgoryData();
  }, [userRole]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    if (!data.tableNumber || !data.capacity || !data.price) {
      setError1("Pls fill all the fields");
      setLoader(false);
      return;
    }

    try {
      let resp;
      if (editingTableId) {
        resp = await axios.put(
          `https://restaurant-backend-wwjm.onrender.com/api/v1/update-table/${editingTableId}`,
          data,
          { headers: { Authorization: `Bearer ${userRole}` } }
        );
      } else {
        resp = await axios.post(
          "https://restaurant-backend-wwjm.onrender.com/api/v1/create-table",
          data,
          { headers: { Authorization: `Bearer ${userRole}` } }
        );
      }

      if (resp.data.success === true) {
        toast.success(resp.data.msg);
        setShowTableModal(false);
        fetchTable();
        setEditingTableId(null);
      } else {
        toast.error(resp.data.msg || "An error occurred. Please try again.");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.msg || "An error occurred. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoader(false);
    }
  };

  const handleCatSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    if (!name.trim()) {
      setError("Pls Fill The Input Field");
      setLoader(false);
      return;
    }

    try {
      const resp = await axios.post(
        "https://restaurant-backend-wwjm.onrender.com/api/v1/create-table-category",
        { name },
        { headers: { Authorization: `Bearer ${userRole}` } }
      );
      if (resp.data.sucess === true) {
        toast.success(resp.data.msg);
        setShowCategoryModal(false);
      } else {
        toast.error(resp.data.msg);
      }
    } catch (error) {
      console.error("Error creating category:", error);
    } finally {
      setLoader(false);
    }
  };

  const handleDelete = async (_id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this table?"
    );
    if (!confirmDelete) return;

    try {
      const resp = await axios.delete(
        `https://restaurant-backend-wwjm.onrender.com/api/v1/delete-table/${_id}`,
        { headers: { Authorization: `Bearer ${userRole}` } }
      );
      if (resp.data.success) {
        toast.success("Table deleted successfully");
        fetchTable();
      } else {
        toast.error("Failed to delete table");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (tableData) => {
    setData({
      tableNumber: tableData.tableNumber,
      capacity: tableData.capacity,
      price: tableData.price,
      categoryId: tableData.categoryId,
    });
    setEditingTableId(tableData._id);
    setShowTableModal(true);
  };

  
  useEffect(() => {
    const handleData = async () => {
      const resp = await axios.get('https://restaurant-backend-wwjm.onrender.com/api/v1/get-All-table', {headers: {Authorization: `Bearer ${userRole}`}});
      if (resp.data.success === true) {
        setData(resp.data.data);
      }
    };
    handleData();
  }, []);

  const handleReserve = async (e, _id) => {
    e.preventDefault();
    try {
      const rescp = await axios.put(`https://restaurant-backend-wwjm.onrender.com/api/v1/update-reserve-table/${_id}`, { isReserved: false, isPaid: false, reservedAt: null }, {headers: {Authorization: `Bearer ${userRole}`}});
      if (rescp.data.success === true) {
        toast.success('Table Unreserved successfully');
        setData(data.map((item) => (item._id === _id ? { ...item, isReserved: false } : item)));
      } else {
        toast.error('Failed to unreserve table');
      }
    } catch (error) {
      toast.error('Failed to unreserved table');
      console.log(error);
    }
  };

  return (
    <div className="">
      {/* Action buttons */}
      <div className="flex justify-end gap-5 items-center mb-4">
        <button
          onClick={() => setShowCategoryModal(true)}
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
        >
          + Add Table Category
        </button>
        <button
          onClick={() => setShowTableModal(true)}
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
        >
          + Add Table
        </button>
      </div>

      {/* Modal UI code omitted here for brevity – already in your original */}

      <div className="p-6 space-y-8">
        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-4 items-center">
          {/* Category Filter Buttons */}
          <div className="flex gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1 rounded-full border text-sm font-semibold transition-all ${
                  selectedCategory === cat
                    ? "bg-orange-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Reservation Filter Buttons */}
          <div className="flex gap-2">
            {["All", "Available", "Reserved"].map((label) => (
              <button
                key={label}
                onClick={() => setReservationFilter(label)}
                className={`px-4 py-1 rounded-full border text-sm font-semibold transition-all ${
                  reservationFilter === label
                    ? "bg-orange-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Table Display by Category */}
        {["Regular", "Executive"].map((sectionName) => {
          const sectionTables = filteredTables.filter(
            (t) => t.categoryId?.name === sectionName
          );

          return (
            <div key={sectionName}>
              <h2 className="text-xl font-semibold mb-2">
                {sectionName} Tables
              </h2>
              {sectionTables.length > 0 ? (
                <div className="overflow-x-auto whitespace-nowrap py-4 px-2">
                  {sectionTables.map((table) => renderTable(table))}
                </div>
              ) : (
                <p className="text-center text-xl italic py-6">
                  No {sectionName.toLowerCase()} tables available
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Release Table Section */}
      <div>
        <h1 className="text-xl font-semibold ml-4 mb-2">Reserved Tables</h1>
      </div>
      <div className="grid grid-cols-4 gap-4">
      {data?.length > 0 &&
        data.map((e) => (
          <div key={e._id} className="bg-green-400 shadow-sm py-5 px-2 rounded-xl">
           <div className="flex text-white font-bold items-center gap-6">
           <p className="text-md">Table Number:</p>
           <p className="text-md">{e.tableNumber}</p>
           </div>
            {e.isReserved === true ? (
              <button className="p-3 bg-gray-400 rounded-xs" onClick={(e) => handleReserve(e, e._id)}>
                Release
              </button>
            ) : (
              null
            )}
          </div>
        ))}
    </div>
    </div>
  );
};

export default Tables;
